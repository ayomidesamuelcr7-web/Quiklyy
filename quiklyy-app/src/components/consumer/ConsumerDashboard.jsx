import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import useCartStore from '../../store/useCartStore';
import toast from 'react-hot-toast';
import ConsumerHeader from './ConsumerHeader';
import BottomNav from '../shared/ui/BottomNav';
import ShoppingPage from './ShoppingPage';
import CartPage from './CartPage';
import PurchaseScreen from './PurchaseScreen';
import MenuPage from './MenuPage';
import ProfileDetails from './ProfileDetails';
import PasswordDetails from './PasswordDetails';
import NotificationDetails from './NotificationDetails';
import DeactivateDetails from './DeactivateDetails';
import CountryDetails from './CountryDetails';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

export default function ConsumerDashboard({ session, onLogout }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

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
          price: Number(item.discounted_price), 
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

  useEffect(() => {
    fetchItems();
  }, []);

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
        
        const newQuantity = item.stock - item.quantity;
        await supabase
          .from('items')
          .update({ quantity: newQuantity })
          .eq('id', item.id);
      }

      toast.success('Checkout successful! Check your orders.');
      clearCart();
      fetchItems();
      navigate('/consumer/orders');
    } catch (error) {
      console.error('Error during checkout:', error.message);
      toast.error('Failed to complete checkout.');
    } finally {
      setReserving(false);
    }
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/cart')) return 'cart';
    if (path.includes('/orders')) return 'purchases';
    if (path.includes('/menu')) return 'menu';
    return 'shopping';
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <ConsumerHeader onLogout={onLogout} />
      
      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto md:px-8">
          
          {/* Desktop Tabs (Hidden on Mobile) */}
          <div className="hidden md:flex border-b border-gray-200 mb-6 gap-2">
            <button 
              onClick={() => navigate('/consumer/shop')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'shopping' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => navigate('/consumer/cart')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'cart' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Cart
            </button>
            <button 
              onClick={() => navigate('/consumer/orders')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'purchases' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Orders
            </button>
            <button 
              onClick={() => navigate('/consumer/menu')}
              className={`pb-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'menu' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Menu
            </button>
          </div>

          <Routes>
            <Route path="shop" element={
              loading ? (
                <p className="text-gray-500 text-center py-12">Loading deals from local businesses...</p>
              ) : (
                <ShoppingPage items={items} />
              )
            } />
            <Route path="cart" element={<CartPage onCheckout={handleCheckout} />} />
            <Route path="orders" element={<PurchaseScreen session={session} />} />
            <Route path="menu" element={<MenuPage session={session} onLogout={onLogout} />} />
            <Route path="profile" element={<ProfileDetails />} />
            <Route path="password" element={<PasswordDetails />} />
            <Route path="notification" element={<NotificationDetails />} />
            <Route path="deactivate" element={<DeactivateDetails />} />
            <Route path="country" element={<CountryDetails />} />
            <Route path="*" element={<Navigate to="shop" replace />} />
          </Routes>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}
