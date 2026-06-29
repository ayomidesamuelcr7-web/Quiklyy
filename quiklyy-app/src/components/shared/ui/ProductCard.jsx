import { MapPin, Store } from 'lucide-react';

export default function ProductCard({ item, onSelect }) {
  const currentPrice = item?.price !== undefined ? item.price : item?.discountedPrice;
  
  const discountPercent = item?.originalPrice && currentPrice 
    ? Math.round(((item.originalPrice - currentPrice) / item.originalPrice) * 100)
    : 50; 

  const imageSrc = item?.image || "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2070&auto=format&fit=crop";

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xs w-full p-2 flex flex-col cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
        <img 
          src={imageSrc} 
          alt={item?.name || "1 SaraLee Bread"} 
          className="w-full h-full object-cover"
        />
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-[#09466b] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>
      
      <div className="pt-3 pb-1 flex flex-col flex-grow px-1">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
          {item?.name || "1 SaraLee Bread"}
        </h3>
        
        <div className="flex justify-between items-end mt-2">
          <div className="flex flex-col gap-1 w-2/3">
            <div className="flex items-center text-[11px] text-gray-500 font-medium">
              <Store size={13} className="mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">{item?.storeName || "SaraLee Mart"}</span>
            </div>
            <div className="flex items-center text-[11px] text-gray-500">
              <MapPin size={13} className="mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {item?.address || item?.distance || "2a festus okpaire, aboru lagos"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <div className="line-through text-[11px] text-gray-400 font-bold leading-none mb-1">
              ₦{item?.originalPrice ? Number(item.originalPrice).toFixed(0) : "2000"}
            </div>
            <div className="text-[18px] font-extrabold text-[#09466b] leading-none">
              ₦{currentPrice ? Number(currentPrice).toFixed(0) : "1000"}
            </div>
          </div>
        </div>
        
        <button 
          className="w-full mt-3.5 bg-[#09466b] text-white font-bold text-center py-2.5 rounded-[10px] text-sm hover:bg-[#073655] transition-colors"
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
