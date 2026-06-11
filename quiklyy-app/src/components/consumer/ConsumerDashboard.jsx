import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ConsumerHeader from './ConsumerHeader';
import BottomNav from '../shared/ui/BottomNav';
import ShoppingPage from './ShoppingPage';
import CartPage from './CartPage';
import PurchaseScreen from './PurchaseScreen';
import MenuPage from './MenuPage';

export default function ConsumerDashboard({ session, onLogout }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shopping');
  const [cart, setCart] = useState({});
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
          price: Number(item.discounted_price), // mapped for ProductCard/CartItemCard
          hoursLeft: item.hours_left,
          stock: item.quantity,
          image: item.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
        })).filter(item => item.stock > 0);
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('Error fetching consumer items:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (id, quantity) => {
    setCart(prev => {
      const newCart = { ...prev };
      const item = items.find(i => i.id === id);
      if (quantity <= 0) {
        delete newCart[id];
      } else if (item) {
        newCart[id] = { ...item, quantity };
      }
      return newCart;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (quantity <= 0) {
        delete newCart[id];
      } else if (newCart[id]) {
        newCart[id].quantity = quantity;
      }
      return newCart;
    });
  };

  const handleCheckout = async () => {
    const cartItems = Object.values(cart);
    if (cartItems.length === 0) return;
    
    setReserving(true);
    try {
      for (const item of cartItems) {
        const { error: orderError } = await supabase
          .from('orders')
          .insert([{
            consumer_id: session.user.id,
            item_id: item.id,
            status: 'reserved',
            quantity: item.quantity
          }]);

        if (orderError) throw orderError;
        
        // Decrement inventory
        const newQuantity = item.stock - item.quantity;
        await supabase
          .from('items')
          .update({ quantity: newQuantity })
          .eq('id', item.id);
      }

      alert('Checkout successful! Check your orders.');
      setCart({});
      setActiveTab('purchases');
      fetchItems();
    } catch (error) {
      console.error('Error during checkout:', error.message);
      alert('Failed to complete checkout.');
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ConsumerHeader onLogout={onLogout} />
      
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          
          {/* Desktop Tabs (Hidden on Mobile) */}
          <div className="hidden md:flex border-b border-gray-200 mb-6 gap-2">
            <button 
              onClick={() => setActiveTab('shopping')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'shopping' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setActiveTab('cart')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'cart' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Cart
            </button>
            <button 
              onClick={() => setActiveTab('purchases')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'purchases' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Orders
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'menu' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Menu
            </button>
          </div>

          {/* Render Active View */}
          {activeTab === 'shopping' && (
            loading ? (
              <p className="text-gray-500 text-center py-12">Loading deals from local businesses...</p>
            ) : (
              <ShoppingPage items={items} onAddToCart={handleAddToCart} />
            )
          )}

          {activeTab === 'cart' && (
            <CartPage 
              cart={cart} 
              onQuantityChange={handleQuantityChange} 
              onCheckout={handleCheckout} 
            />
          )}

          {activeTab === 'purchases' && (
            <PurchaseScreen session={session} />
          )}

          {activeTab === 'menu' && (
            <MenuPage session={session} onLogout={onLogout} />
          )}

        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
