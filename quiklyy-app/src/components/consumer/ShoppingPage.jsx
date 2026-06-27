import React, { useState } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import CartItemCard from '../shared/ui/CartItemCard';
import ProductModal from './ProductModal';
import useCartStore from '../../store/useCartStore';

export default function ShoppingPage({ items }) {
  const cart = useCartStore(state => state.cart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleQuantityChange = (id, quantity) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateQuantity(item, quantity);
    }
  };

  const handleModalPurchase = (id, quantity) => {
    const currentQty = cart[id]?.quantity || 0;
    handleQuantityChange(id, currentQty + quantity);
  };

  // Filter out items that have been fully purchased
  const feedItems = items.filter(item => {
    const maxStock = item.stock || 9;
    const cartQty = cart[item.id]?.quantity || 0;
    return maxStock > cartQty;
  });

  return (
    <div className="animate-slide-up bg-[#f9f9f9] min-h-screen px-5 py-4">
      {!selectedItem && (
        <>
          <SearchBar />
          <div className="mt-2">
            <h2 className="text-[18px] font-bold text-[#353535] mb-4">
              Ending soon near you
            </h2>
            <div className="flex flex-col gap-[0.7rem] pb-24">
              {feedItems.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id]?.quantity || 0}
                  onQuantityChange={handleQuantityChange}
                  onClick={() => setSelectedItem(item)}
                  isCartView={false}
                />
              ))}
              {feedItems.length === 0 && (
                <p className="text-gray-500 text-center py-8">No more deals available right now.</p>
              )}
            </div>
          </div>
        </>
      )}

      {selectedItem && (
        <ProductModal
          item={selectedItem}
          cartQuantity={cart[selectedItem.id]?.quantity || 0}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleModalPurchase}
        />
      )}
    </div>
  );
}
