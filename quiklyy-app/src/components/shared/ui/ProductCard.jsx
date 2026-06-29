import { MapPin, Store } from 'lucide-react';

export default function ProductCard({ item, onSelect }) {
  // Use item.price if available (from ConsumerDashboard mapping), otherwise fallback to item.discountedPrice
  const currentPrice = item?.price !== undefined ? item.price : item?.discountedPrice;
  
  // Calculate discount percentage
  const discountPercent = item?.originalPrice && currentPrice 
    ? Math.round(((item.originalPrice - currentPrice) / item.originalPrice) * 100)
    : 50; // Fallback to 50 as per spec

  const imageSrc = item?.image || "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2070&auto=format&fit=crop"; // Loaf of bread placeholder

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xs w-full flex flex-col cursor-pointer overflow-hidden"
    >
      <div className="relative w-full aspect-[4/3]">
        <img 
          src={imageSrc} 
          alt={item?.name || "1 SaraLee Bread"} 
          className="w-full h-full object-cover rounded-t-2xl"
        />
        {discountPercent > 0 && (
          <div className="absolute top-0 right-0 m-2 bg-[#09466b] text-white text-xs font-semibold px-2 py-1 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900">
          {item?.name || "1 SaraLee Bread"}
        </h3>
        
        <div className="flex justify-between items-end mt-2 flex-grow">
          <div className="flex flex-col gap-1 w-2/3 pr-2">
            <div className="flex items-center text-xs text-gray-500 font-medium">
              <Store size={14} className="mr-1.5 flex-shrink-0" />
              <span className="truncate">{item?.storeName || "SaraLee Mart"}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1.5 flex-shrink-0" />
              <span className="truncate">
                {item?.address || item?.distance || "2a festus okpaire, aboru lagos"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <div className="line-through text-xs text-gray-400 font-bold">
              ₦{item?.originalPrice ? Number(item.originalPrice).toFixed(0) : "2000"}
            </div>
            <div className="text-xl font-extrabold text-[#09466b]">
              ₦{currentPrice ? Number(currentPrice).toFixed(0) : "1000"}
            </div>
          </div>
        </div>
        
        <button 
          className="w-full mt-4 bg-[#09466b] text-white font-bold text-center py-2.5 rounded-xl hover:bg-[#073655] transition-colors"
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
