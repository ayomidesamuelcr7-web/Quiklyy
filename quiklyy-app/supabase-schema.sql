-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  role text check (role in ('personal', 'business')) not null,
  first_name text,
  last_name text,
  business_name text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for items (inventory)
create table items (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references profiles(id) not null,
  name text not null,
  category text not null,
  original_price numeric not null,
  discounted_price numeric not null,
  quantity integer not null,
  hours_left integer not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table items enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select using ( true );

create policy "Users can insert their own profile."
  on profiles for insert with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update using ( auth.uid() = id );

-- Items Policies
create policy "Items are viewable by everyone."
  on items for select using ( true );

create policy "Businesses can insert their own items."
  on items for insert with check ( auth.uid() = business_id );

create policy "Anyone can update items."
  on items for update using ( auth.role() = 'authenticated' );

create policy "Businesses can delete their own items."
  on items for delete using ( auth.uid() = business_id );

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  consumer_id uuid references profiles(id) not null,
  item_id uuid references items(id) not null,
  status text check (status in ('reserved', 'completed', 'cancelled')) default 'reserved' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table orders enable row level security;

-- Consumers can view their own orders
create policy "Consumers can view own orders." 
  on orders for select using ( auth.uid() = consumer_id );

-- Consumers can create their own orders
create policy "Consumers can create own orders." 
  on orders for insert with check ( auth.uid() = consumer_id );

-- Businesses can view orders for their items
create policy "Businesses can view orders for their items."
  on orders for select using (
    item_id in (
      select id from items where business_id = auth.uid()
    )
  );

-- Businesses can update orders for their items (e.g. mark as completed or cancelled)
create policy "Businesses can update orders for their items."
  on orders for update using (
    item_id in (
      select id from items where business_id = auth.uid()
    )
  );

-- Storage bucket for item images
insert into storage.buckets (id, name, public) 
values ('item-images', 'item-images', true)
on conflict (id) do nothing;

create policy "Anyone can view item images."
  on storage.objects for select using ( bucket_id = 'item-images' );

create policy "Businesses can upload item images."
  on storage.objects for insert with check ( bucket_id = 'item-images' and auth.role() = 'authenticated' );

-- Support multiple images per item
alter table items add column if not exists image_urls text[] default '{}';

-- Track order quantity
alter table orders add column if not exists quantity integer default 1;
