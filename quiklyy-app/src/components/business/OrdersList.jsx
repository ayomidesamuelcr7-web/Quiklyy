import { format } from 'date-fns';

export default function OrdersList({ orders, onCompleteOrder, searchQuery = '' }) {
  const filteredOrders = orders?.filter(order => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const shortId = order.id.substring(0, 6).toLowerCase();
    const customerName = `${order.profiles?.first_name || ''} ${order.profiles?.last_name || ''}`.trim().toLowerCase();
    return shortId.includes(query) || customerName.includes(query);
  });

  if (!filteredOrders || filteredOrders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {filteredOrders.map((order) => (
          <li key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  {order.item?.image_url ? (
                    <img
                      src={order.item.image_url}
                      alt={order.item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.item?.name || 'Unknown Item'} <span className="text-sm text-gray-500 font-normal">x{order.quantity || 1}</span>
                    </h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-mono border border-gray-200">
                      {order.id.substring(0, 6).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Customer: {(`${order.profiles?.first_name || ''} ${order.profiles?.last_name || ''}`.trim()) || 'N/A (Old Account)'}
                  </div>
                  <div className="text-sm text-gray-500">
                    Ordered: {format(new Date(order.created_at), 'MMM d, h:mm a')}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="text-lg font-bold text-gray-900">
                  ₦{((order.item?.discounted_price || 0) * (order.quantity || 1)).toFixed(2)}
                </div>

                <div className="flex items-center space-x-2">
                  {order.status === 'reserved' && (
                    <button
                      onClick={() => onCompleteOrder(order.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                      Confirm pickup
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  )}
                  {order.status === 'cancelled' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
