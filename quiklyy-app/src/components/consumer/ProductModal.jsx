import React, { useState } from 'react';
import { Clock, Package, ChevronLeft } from 'lucide-react';
import { IconMapPin, IconShoppingCart, IconShoppingBag } from '../shared/ui/CustomIcons';

export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < (item.stock || 9)) setQuantity(quantity + 1);
  };

  const handlePurchase = () => {
    onAddToCart(item.id, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-slide-up pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-6 pb-4 px-5">
        <button onClick={onClose} className="absolute left-5 text-[#353535]">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[18px] font-bold text-[#353535]">Item details</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-40 hide-scrollbar">
        {/* Product Image */}
        <div className="w-full aspect-[3/4] sm:aspect-square bg-gray-100 rounded-[16px] overflow-hidden mb-5">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="mb-2">
          <h2 className="text-[22px] font-bold text-[#353535]">{item.name}</h2>
          <p className="text-[15px] text-gray-400 mt-0.5">{item.storeName || 'Quiklyy Partner'}</p>
        </div>

        <div className="flex justify-between items-end mb-6">
          <div className="flex items-start gap-1.5 flex-1 min-w-0 pr-4">
            <IconMapPin size={14} className="text-gray-400 mt-1 flex-shrink-0" />
            <p className="text-[13px] text-gray-400 leading-tight pr-4">
              {item.distance || 'Local area'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
             <div className="text-[14px] text-gray-400 line-through font-medium">₦{item.originalPrice || (item.price * 2)}</div>
             <div className="font-bold text-[32px] text-[#004466] leading-none">₦{item.price}</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-white/90 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="bg-[#f9f9f9] rounded-[20px] p-4 flex flex-col gap-4 shadow-sm border border-gray-100">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#353535]">
              <Package size={18} strokeWidth={2} />
              <span className="font-semibold text-[14px]">{item.stock || 9} items available</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={18} strokeWidth={2} />
              <span className="text-[14px]">Store closes at 9pm</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-12 h-12 flex-shrink-0 bg-[#e6f0f5] text-[#004466] rounded-[12px] flex items-center justify-center">
              <IconShoppingCart size={24} />
            </button>
            
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full h-12 p-1 w-[100px] flex-shrink-0 shadow-sm">
              <button 
                onClick={handleDecrease}
                className="w-9 h-9 flex items-center justify-center bg-[#f2f2f2] text-gray-600 rounded-full font-medium"
              >
                -
              </button>
              <span className="font-bold text-[14px] text-[#353535] flex-1 text-center">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="w-9 h-9 flex items-center justify-center bg-[#004466] text-white rounded-full font-bold"
              >
                +
              </button>
            </div>

            <button 
              onClick={handlePurchase}
              className="flex-1 h-12 bg-[#004466] text-white rounded-[12px] flex items-center justify-center gap-2 font-bold text-[15px] shadow-md active:scale-95 transition-transform"
            >
              <IconShoppingBag size={20} />
              <span>Purchase</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
