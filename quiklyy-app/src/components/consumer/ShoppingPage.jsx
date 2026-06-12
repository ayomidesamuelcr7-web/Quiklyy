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
    <div className="animate-slide-up bg-[#f9f9f9] min-h-screen px-5 py-4">
      <SearchBar />
      <div className="mt-2">
        <h2 className="text-[18px] font-bold text-[#353535] mb-4">
          Ending soon near you
        </h2>
        <div className="grid grid-cols-2 gap-3 pb-24">
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
