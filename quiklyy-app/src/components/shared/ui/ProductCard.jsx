import { MapPin, Store } from 'lucide-react';

export default function ProductCard({ item, onSelect }) {
  // Use item.price if available (from ConsumerDashboard mapping), otherwise fallback to item.discountedPrice
  const currentPrice = item.price !== undefined ? item.price : item.discountedPrice;
  
  // Calculate discount percentage
  const discountPercent = item.originalPrice && currentPrice 
    ? Math.round(((item.originalPrice - currentPrice) / item.originalPrice) * 100)
    : 0;

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-[16px] shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow duration-200 flex flex-col group cursor-pointer"
    >
      <div className="relative h-[220px] w-full bg-gray-100 rounded-[12px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-[#004466] text-white text-[12px] font-bold px-2 py-0.5 rounded-md">
            -{discountPercent}%
          </div>
        )}
      </div>
      
      <div className="pt-3 px-1 flex flex-col flex-grow">
        <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-2">
          {item.name}
        </h3>
        
        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col gap-1.5 flex-1 pr-2">
            <div className="flex items-center text-gray-500 text-[13px]">
              <Store size={14} className="mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">{item.storeName}</span>
            </div>
            <div className="flex items-center text-gray-500 text-[13px]">
              <MapPin size={14} className="mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">{item.distance}</span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-end flex-shrink-0">
            {item.originalPrice && (
              <div className="text-[13px] text-gray-400 line-through font-semibold leading-none mb-1">
                ₦{Number(item.originalPrice).toFixed(0)}
              </div>
            )}
            <div className="text-[20px] font-extrabold text-[#004466] leading-none">
              ₦{Number(currentPrice).toFixed(0)}
            </div>
          </div>
        </div>
        
        <button 
          className="w-full mt-3 bg-[#004466] hover:bg-[#003355] text-white font-semibold py-2.5 rounded-[12px] transition-colors active:scale-95 text-[15px]"
          onClick={(e) => {
            e.stopPropagation();
            onSelect && onSelect(item);
          }}
        >
          Grab
        </button>
      </div>
    </div>
  );
}
