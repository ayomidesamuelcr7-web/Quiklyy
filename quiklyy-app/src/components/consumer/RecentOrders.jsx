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
          quantity,
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
        .order('created_at', { ascending: false });

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
    return <div className="py-10 text-center text-gray-500 text-sm">Loading recent purchases...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-[22px] font-bold text-[#353535] flex items-center gap-2">
          <Clock size={24} className="text-[#353535]" />
          Recent purchases
        </h2>
      </div>
      
      {!orders || orders.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-500">You haven't made any recent purchases yet.</p>
        </div>
      ) : (
        <div className="space-y-[0.5px]">
          {orders.map((order) => {
            const qty = order.quantity || 1;
            const isCompleted = order.status === 'completed';
            const statusLabel = isCompleted ? 'Completed' : 'Awaiting pickup';
            const statusBg = isCompleted ? 'bg-[#e6f4ea]' : 'bg-[#fef7e0]';
            const statusText = isCompleted ? 'text-[#137333]' : 'text-[#b08d00]';

            return (
              <div 
                key={order.id} 
                className="bg-white rounded-[16px] border border-gray-200 overflow-hidden flex flex-row p-3 gap-3 items-center shadow-sm"
              >
                <div className="w-[84px] h-[84px] bg-gray-100 rounded-[12px] overflow-hidden flex-shrink-0">
                  <img 
                    src={order.items?.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop'} 
                    alt={order.items?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <h3 className="font-semibold text-[16px] text-gray-900 truncate">
                    {qty} {order.items?.name}
                  </h3>
                  <p className="text-[13px] text-gray-400 mt-0.5">{order.items?.profiles?.business_name || 'Unknown Store'}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5 font-mono">ID: {order.id.substring(0, 6).toUpperCase()}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="font-bold text-[16px] text-[#004466]">
                      ₦{Number(order.items?.discounted_price).toFixed(0)}
                    </div>
                    <div className={`px-2.5 py-1 rounded-[8px] text-[12px] font-semibold ${statusBg} ${statusText}`}>
                      {statusLabel}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
