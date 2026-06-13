import React, { useState } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import CartItemCard from '../shared/ui/CartItemCard';
import ProductModal from './ProductModal';

export default function ShoppingPage({ items, onAddToCart }) {
  const [quantities, setQuantities] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const handleQuantityChange = (id, quantity) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
    onAddToCart(id, quantity);
  };

  const handleModalPurchase = (id, quantity) => {
    handleQuantityChange(id, (quantities[id] || 0) + quantity);
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
              onClick={() => setSelectedItem(item)}
              isCartView={false}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <ProductModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={handleModalPurchase} 
        />
      )}
    </div>
  );
}
