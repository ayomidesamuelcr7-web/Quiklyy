import React from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartItemCard({ item, quantity = 0, onQuantityChange, isCartView = false }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex ${isCartView ? 'flex-row' : 'flex-col sm:flex-row'} p-3 gap-4 items-center transition-all hover:shadow-md`}>
      
      {/* Product Image Placeholder */}
      <div className={`bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden ${isCartView ? 'w-20 h-20' : 'w-full sm:w-28 h-40 sm:h-28'}`}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <ShoppingBag size={32} className="text-gray-300" />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-center min-w-0 w-full">
        <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
        {!isCartView && item.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-2">{item.description}</p>
        )}
        <div className="font-semibold text-brand-blue mt-1">₦{Number(item.price).toFixed(2)}</div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button 
          onClick={() => onQuantityChange(item.id, Math.max(0, quantity - 1))}
          disabled={quantity === 0}
          className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 hover:text-brand-accent hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Minus size={16} />
        </button>
        <span className="w-4 text-center font-medium text-gray-900">{quantity}</span>
        <button 
          onClick={() => onQuantityChange(item.id, quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded bg-white text-brand-blue hover:text-brand-accent hover:shadow-sm transition-all"
        >
          <Plus size={16} />
        </button>
      </div>

    </div>
  );
}
