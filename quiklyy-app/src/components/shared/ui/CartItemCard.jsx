import React from 'react';
import { MapPin } from 'lucide-react';

export default function CartItemCard({ item, quantity = 0, onQuantityChange, isCartView = false }) {
  if (isCartView) {
    // Basic fallback for cart view, if needed
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row p-3 gap-4 items-center">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0">
          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
          <div className="font-semibold text-[#004466] mt-1">₦{Number(item.price).toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
           {/* Quantity buttons */}
           <button onClick={() => onQuantityChange(item.id, Math.max(0, quantity - 1))} className="px-2">-</button>
           <span>{quantity}</span>
           <button onClick={() => onQuantityChange(item.id, quantity + 1)} className="px-2">+</button>
        </div>
      </div>
    );
  }

  // Shopping Page Card View
  return (
    <div className="bg-white rounded-[16px] border border-gray-200 overflow-hidden flex flex-col p-2 pb-3">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-[12px] overflow-hidden">
        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
        <div className="absolute top-2 right-2 bg-[#004466] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
          -50%
        </div>
      </div>

      {/* Details */}
      <div className="pt-3 px-1">
        <h3 className="font-bold text-[13px] text-gray-900 truncate">{item.name}</h3>
        
        <div className="flex justify-between items-end mt-1">
          <div className="flex items-start gap-1 flex-1 min-w-0 pr-2">
            <MapPin size={10} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-[9px] text-gray-500 leading-tight truncate whitespace-normal line-clamp-2">
              {item.distance}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
             <div className="text-[9px] text-gray-400 line-through">₦{item.originalPrice || (Number(item.price) * 2)}</div>
             <div className="font-bold text-[13px] text-[#004466] leading-none">₦{item.price}</div>
          </div>
        </div>

        <button 
          onClick={() => onQuantityChange(item.id, quantity + 1)}
          className="w-full mt-3 bg-[#004466] text-white text-[13px] font-semibold py-2 rounded-[10px]"
        >
          Grab
        </button>
      </div>
    </div>
  );
}
