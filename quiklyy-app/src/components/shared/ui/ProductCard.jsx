import { MapPin } from 'lucide-react';
import Badge from './Badge';

export default function ProductCard({ item, onSelect }) {
  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col group cursor-pointer"
    >
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge hoursLeft={item.hoursLeft} />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="font-medium text-gray-700">{item.storeName}</span>
          <span className="mx-1.5">•</span>
          <MapPin size={14} className="mr-0.5" />
          <span>{item.distance}</span>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-sm text-gray-400 line-through mb-0.5">₦{item.originalPrice.toFixed(2)}</div>
            <div className="text-xl font-bold text-brand-blue">₦{item.discountedPrice.toFixed(2)}</div>
          </div>
          <button 
            className="bg-brand-blue hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-colors active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
