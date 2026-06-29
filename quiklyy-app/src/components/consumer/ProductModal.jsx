import React, { useState } from 'react';
import { Clock, Package, ChevronLeft, MapPin, ShoppingCart, ShoppingBag, Store } from 'lucide-react';

export default function ProductModal({ item, cartQuantity = 0, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const maxAvailable = (item.stock || 9) - cartQuantity;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < maxAvailable) setQuantity(quantity + 1);
  };

  const handlePurchase = () => {
    onAddToCart(item.id, quantity);
    onClose();
  };

  return (
    <div className="bg-white flex flex-col animate-slide-up pb-[env(safe-area-inset-bottom)] -mx-2 -mt-4 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-6 pb-4 px-2">
        <button onClick={onClose} className="absolute left-5 text-[#353535]">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[18px] font-bold text-[#353535]">Item details</h1>
      </div>

      <div className="px-2 pb-6">
        {/* Product Image */}
        <div className="w-full aspect-[3/4] sm:aspect-square bg-gray-100 rounded-[16px] overflow-hidden mb-5">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="mb-2">
          <h2 className="text-[22px] font-bold text-[#353535]">{item.name}</h2>
        </div>

        <div className="flex items-center gap-1.5 mb-1.5 mt-2">
          <Store size={14} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />
          <p className="text-[15px] text-gray-400">{item.storeName || 'Quiklyy Partner'}</p>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={14} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />
          <p className="text-[13px] text-gray-400">
            {item.distance || 'Local area'}
          </p>
        </div>

        <div className="flex justify-end items-center gap-2 mb-6">
          <div className="text-[16px] text-gray-600 line-through font-bold mt-2">₦{item.originalPrice || (item.price * 2)}</div>
          <div className="font-bold text-[36px] text-[#004466] leading-none">₦{item.price}</div>
        </div>

        {/* Availability Box */}
        <div className="bg-[#f5f5f5] rounded-[16px] p-4 flex items-center gap-3 mb-8">
          <Package size={24} strokeWidth={1.5} className="text-[#353535] flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-[#353535]">{item.stock || 9} items available</span>
            <span className="text-[13px] text-gray-400 mt-0.5">Stock is limited. First come, first served.</span>
          </div>
        </div>

        {/* Action Area inline */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePurchase}
            className="w-12 h-12 flex-shrink-0 bg-[#d4effa] text-[#004466] rounded-[12px] flex items-center justify-center active:scale-95 transition-transform"
          >
            <ShoppingCart size={22} strokeWidth={1.5} />
          </button>
          
          <div className="flex items-center justify-between bg-white border border-gray-100 shadow-sm rounded-full h-[46px] p-1 w-[105px] flex-shrink-0">
            <button 
              onClick={handleDecrease}
              className="w-9 h-9 flex items-center justify-center bg-[#eaeaea] text-gray-600 rounded-full font-bold text-[18px]"
            >
              -
            </button>
            <span className="font-bold text-[16px] text-[#353535] flex-1 text-center">{quantity}</span>
            <button 
              onClick={handleIncrease}
              className="w-9 h-9 flex items-center justify-center bg-[#004466] text-white rounded-full font-bold text-[18px]"
            >
              +
            </button>
          </div>

          <button 
            onClick={handlePurchase}
            className="flex-1 h-12 bg-[#004466] text-white rounded-[12px] flex items-center justify-center gap-2 font-bold text-[15px] shadow-sm active:scale-95 transition-transform"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            <span>Purchase</span>
          </button>
        </div>
      </div>

    </div>
  );
}
