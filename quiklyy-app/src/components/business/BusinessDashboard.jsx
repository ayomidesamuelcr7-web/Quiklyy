import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import AddItemForm from './AddItemForm';
import InventoryList from './InventoryList';
import OrdersList from './OrdersList';
import { supabase } from '../../lib/supabaseClient';
import BusinessHeader from './BusinessHeader';
import { startOfDay } from 'date-fns';
import { Search } from 'lucide-react';

export default function BusinessDashboard({ session, onLogout }) {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ revenueSaved: 0, itemsSoldToday: 0, activeListings: 0 });

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      // 1. Fetch inventory items
      const { data: itemsData, error: itemsError } = await supabase
        .from('items')
        .select('*')
        .eq('business_id', session.user.id)
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;
      
      const items = itemsData || [];
      setInventory(items);

      // Calculate active listings (items with quantity > 0)
      const activeListings = items.filter(item => item.quantity > 0).length;

      // 2. Fetch orders for today to calculate revenue and items sold
      let itemsSoldToday = 0;
      let revenueSaved = 0;

      const itemIds = items.map(item => item.id);
      
      if (itemIds.length > 0) {
        const todayStr = startOfDay(new Date()).toISOString();
        
        // Fetch all orders for this business's items
        const { data: allOrdersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            id,
            status,
            quantity,
            created_at,
            item_id,
            profiles (id, first_name, last_name),
            items (id, name, original_price, discounted_price, image_url)
          `)
          .in('item_id', itemIds)
          .order('created_at', { ascending: false });

        if (!ordersError && allOrdersData) {
          // Format orders so that `item` and `profiles` can be accessed uniformly
          const formattedOrders = allOrdersData.map(order => ({
            ...order,
            item: order.items,
            profiles: order.profiles
          }));
          setOrders(formattedOrders);

          // Calculate stats for today
          const todayOrders = formattedOrders.filter(o => 
            new Date(o.created_at) >= new Date(todayStr) && 
            ['reserved', 'completed'].includes(o.status)
          );

          itemsSoldToday = todayOrders.length;
          
          todayOrders.forEach(order => {
            if (order.item) {
              revenueSaved += (Number(order.item.original_price) - Number(order.item.discounted_price)) * (order.quantity || 1);
            }
          });
        } else if (ordersError) {
            console.error('Error fetching orders:', ordersError.message);
        }
      }

      setStats({
        activeListings,
        itemsSoldToday,
        revenueSaved
      });

    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'completed' } : o));
    } catch (error) {
      console.error('Error completing order:', error.message);
      alert('Failed to complete order. Please try again.');
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      setSubmitting(true);
      let imageUrl = null;
      let imageUrls = [];

      // 1. Upload multiple images if provided
      if (newItem.imageFiles && newItem.imageFiles.length > 0) {
        const uploadPromises = newItem.imageFiles.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${session.user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('item-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('item-images')
            .getPublicUrl(filePath);

          return urlData.publicUrl;
        });

        // Wait for all uploads to finish
        imageUrls = await Promise.all(uploadPromises);
        
        // Use the first image as the primary image URL
        if (imageUrls.length > 0) {
          imageUrl = imageUrls[0];
        }
      }

      // 2. Insert item into database
      const { data, error } = await supabase
        .from('items')
        .insert([{
          business_id: session.user.id,
          name: newItem.name,
          category: newItem.category,
          original_price: newItem.originalPrice,
          discounted_price: newItem.discountedPrice,
          quantity: newItem.quantity,
          hours_left: newItem.hoursLeft,
          image_url: imageUrl,
          image_urls: imageUrls
        }])
        .select();

      if (error) throw error;
      if (data) {
        const newInventory = [data[0], ...inventory];
        setInventory(newInventory);
        setStats(prev => ({
          ...prev,
          activeListings: prev.activeListings + 1
        }));
      }
    } catch (error) {
      console.error('Error adding item:', error.message);
      alert('Failed to add item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const deletedItem = inventory.find(i => i.id === id);
      const newInventory = inventory.filter(item => item.id !== id);
      setInventory(newInventory);
      
      if (deletedItem && deletedItem.quantity > 0) {
        setStats(prev => ({
          ...prev,
          activeListings: Math.max(0, prev.activeListings - 1)
        }));
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleMarkSold = async (id) => {
    // For now, treat mark sold as delete
    await handleDelete(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BusinessHeader onLogout={onLogout} />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Merchant Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              Manage your short-life inventory and reduce waste.
            </p>
          </div>

          <StatsCard 
            revenueSaved={stats.revenueSaved} 
            itemsSoldToday={stats.itemsSoldToday} 
            activeListings={stats.activeListings} 
          />
          
          <AddItemForm onAdd={handleAddItem} submitting={submitting} />

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active Inventory</h2>
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                Loading your inventory...
              </div>
            ) : (
              <InventoryList 
                items={inventory.map(item => ({
                  ...item,
                  originalPrice: Number(item.original_price),
                  discountedPrice: Number(item.discounted_price),
                  hoursLeft: item.hours_left
                }))} 
                onDelete={handleDelete} 
                onMarkSold={handleMarkSold} 
              />
            )}
          </div>

          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by Order ID or Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-72 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />
              </div>
            </div>
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                Loading orders...
              </div>
            ) : (
              <OrdersList 
                orders={orders}
                onCompleteOrder={handleCompleteOrder}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
