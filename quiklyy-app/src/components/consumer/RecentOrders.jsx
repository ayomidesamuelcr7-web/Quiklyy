import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Clock } from 'lucide-react';

export default function RecentOrders({ session }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          created_at,
          items (
            name,
            discounted_price,
            image_url,
            profiles (
              business_name
            )
          )
        `)
        .eq('consumer_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-4 text-gray-500 text-sm">Loading recent purchases...</div>;
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Clock className="text-brand-accent" size={20} />
        Recent Purchases
      </h2>
      
      {!orders || orders.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
          <p className="text-gray-500">You haven't made any recent purchases yet.</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                <img 
                  src={order.items?.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop'} 
                  alt={order.items?.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 truncate">{order.items?.name}</h3>
                <p className="text-sm text-gray-500 truncate">{order.items?.profiles?.business_name}</p>
                <p className="text-xs text-gray-400 mt-0.5 font-mono">ID: {order.id.substring(0, 6).toUpperCase()}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-semibold text-brand-blue">₦{Number(order.items?.discounted_price).toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'reserved' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
