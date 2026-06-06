import { useState, useEffect } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import DealFeed from './DealFeed';
import RecentOrders from './RecentOrders';
import ProductModal from './ProductModal';
import { supabase } from '../../lib/supabaseClient';
import ConsumerHeader from './ConsumerHeader';

export default function ConsumerDashboard({ session, onLogout }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');
  const [selectedItem, setSelectedItem] = useState(null);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          profiles (
            business_name,
            address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedItems = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          storeName: item.profiles?.business_name || 'Unknown Store',
          distance: item.profiles?.address || 'Unknown Location',
          originalPrice: Number(item.original_price),
          discountedPrice: Number(item.discounted_price),
          hoursLeft: item.hours_left,
          quantity: item.quantity,
          image: item.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
          imageUrls: item.image_urls || []
        })).filter(item => item.quantity > 0); // Only show items with stock available
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('Error fetching consumer items:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (item, quantityToReserve) => {
    try {
      setReserving(true);
      // 1. Create the order with quantity
      const { data, error: orderError } = await supabase
        .from('orders')
        .insert([{
          consumer_id: session.user.id,
          item_id: item.id,
          status: 'reserved',
          quantity: quantityToReserve
        }])
        .select();

      if (orderError) throw orderError;
      
      // 2. Decrement the inventory
      const newQuantity = item.quantity - quantityToReserve;
      const { error: updateError } = await supabase
        .from('items')
        .update({ quantity: newQuantity })
        .eq('id', item.id);

      if (updateError) {
        console.error('Error updating inventory:', updateError.message);
        // We still successfully reserved, so we won't throw an error here, but we should log it
      }

      alert(`Successfully reserved ${quantityToReserve} of ${item.name}! Check your recent purchases.`);
      
      setSelectedItem(null);
      fetchItems(); 
    } catch (error) {
      console.error('Error reserving item:', error.message);
      alert('Failed to reserve item.');
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ConsumerHeader onLogout={onLogout} />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Save food, save money.
            </h1>
            <p className="text-gray-500 text-lg">
              Grab these local deals before they're gone!
            </p>
          </div>

          <div className="flex border-b border-gray-200 mb-6 gap-2">
            <button 
              onClick={() => setActiveTab('listings')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'listings' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Listings
            </button>
            <button 
              onClick={() => setActiveTab('purchases')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'purchases' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Recent Purchases
            </button>
          </div>
          
          {activeTab === 'listings' ? (
            <>
              <SearchBar />
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="relative">
                    Ending Soon Near You
                    <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-brand-accent rounded-full"></span>
                  </span>
                </h2>
                {loading ? (
                  <p className="text-gray-500 text-center py-12">Loading deals from local businesses...</p>
                ) : (
                  <DealFeed items={items} onSelect={setSelectedItem} />
                )}
              </div>
            </>
          ) : (
            <div className="mt-4">
              <RecentOrders session={session} />
            </div>
          )}
        </div>
      </main>

      {selectedItem && (
        <ProductModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onReserve={handleReserve} 
          reserving={reserving}
        />
      )}
    </div>
  );
}
