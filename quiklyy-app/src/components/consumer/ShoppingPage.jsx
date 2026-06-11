import React, { useState } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import CartItemCard from '../shared/ui/CartItemCard';

export default function ShoppingPage({ items, onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, quantity) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
    onAddToCart(id, quantity);
  };

  return (
    <div className="animate-slide-up">
      <SearchBar />
      <div className="mt-6 md:mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
          <span className="relative">
            Available Deals
            <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-brand-accent rounded-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <CartItemCard 
              key={item.id} 
              item={item} 
              quantity={quantities[item.id] || 0} 
              onQuantityChange={handleQuantityChange} 
              isCartView={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
