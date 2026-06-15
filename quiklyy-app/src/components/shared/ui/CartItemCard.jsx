import React from 'react';
import { MapPin, Store, Trash2, Plus, Minus } from 'lucide-react';

export default function CartItemCard({ item, quantity = 0, onQuantityChange, onClick, isCartView = false }) {
  if (isCartView) {
    return (
      <div className="bg-white rounded-[16px] border border-gray-200 overflow-hidden flex flex-row p-3 gap-3 items-center shadow-sm">
        <div className="w-[84px] h-[84px] bg-gray-100 rounded-[12px] overflow-hidden flex-shrink-0">
          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="font-semibold text-[16px] text-gray-900 truncate">{item.name}</h3>
          <p className="text-[13px] text-gray-400 mt-0.5">{item.storeName || "Store Name"}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">ID: {item.id ? item.id.substring(0, 6).toUpperCase() : 'A25E32'}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="font-bold text-[16px] text-[#004466]">₦{Number(item.price).toFixed(0)}</div>
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => onQuantityChange(item.id, Math.max(0, quantity - 1))} 
                 className="w-7 h-7 flex items-center justify-center bg-gray-200 text-gray-600 rounded-[6px]"
               >
                 <Minus size={14} strokeWidth={3} />
               </button>
               <span className="font-medium text-[14px] w-4 text-center">{quantity}</span>
               <button 
                 onClick={() => onQuantityChange(item.id, quantity + 1)} 
                 className="w-7 h-7 flex items-center justify-center bg-[#004466] text-white rounded-[6px]"
               >
                 <Plus size={14} strokeWidth={3} />
               </button>
               <button 
                 onClick={() => onQuantityChange(item.id, 0)} 
                 className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-[6px] ml-1 transition-colors"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shopping Page Card View
  const originalPrice = item.originalPrice || (Number(item.price) * 2);
  const currentPrice = Number(item.price);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[20px] border border-gray-200 overflow-hidden flex flex-col p-3 pb-4 cursor-pointer shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square bg-gray-100 rounded-[14px] overflow-hidden">
        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
        <div className="absolute top-3 right-3 bg-[#004466] text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-sm">
          -{discountPercent}%
        </div>
      </div>

      {/* Details */}
      <div className="pt-4 px-1 flex flex-col flex-1">
        <h3 className="font-bold text-[18px] text-gray-900 truncate mb-2">{item.name}</h3>
        
        <div className="flex justify-between items-end mt-1 flex-1">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Store size={14} className="flex-shrink-0" />
              <span className="text-[12px] truncate">{item.storeName || "Store Name"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="text-[12px] truncate">{item.location || item.distance || "Location"}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end flex-shrink-0 mb-0.5">
             <div className="text-[12px] text-gray-400 line-through font-semibold mb-0.5">
               ₦{originalPrice}
             </div>
             <div className="font-bold text-[20px] text-[#004466] leading-none">
               ₦{currentPrice}
             </div>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onQuantityChange(item.id, quantity + 1);
          }}
          className="w-full mt-4 bg-[#004466] hover:bg-[#00334d] transition-colors text-white text-[15px] font-bold py-3 rounded-[12px]"
        >
          Grab
        </button>
      </div>
    </div>
  );
}
