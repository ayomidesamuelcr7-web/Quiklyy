import { Trash2, CheckCircle } from 'lucide-react';
import Badge from '../shared/ui/Badge';

export default function InventoryList({ items, onDelete, onMarkSold }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-500">No active inventory. Add an item above to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Item Details</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Time Left</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.category}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-brand-blue">₦{item.discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-400 line-through ml-2 text-xs">₦{item.originalPrice.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.quantity} units</td>
                <td className="px-6 py-4">
                  <Badge hoursLeft={item.hoursLeft} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onMarkSold(item.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" 
                      title="Mark as Sold"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" 
                      title="Delete Listing"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
