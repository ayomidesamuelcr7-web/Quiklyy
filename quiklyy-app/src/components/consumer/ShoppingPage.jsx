import React, { useState } from 'react';
import SearchBar from '../shared/ui/SearchBar';
import CartItemCard from '../shared/ui/CartItemCard';
import ProductModal from './ProductModal';
import useCartStore from '../../store/useCartStore';
import MapView from './MapView';
import { Map, List } from 'lucide-react';

export default function ShoppingPage({ items }) {
  const cart = useCartStore(state => state.cart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('list');

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
          
          <div className="mt-4 mb-4 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#353535]">
              Ending soon near you
            </h2>
            
            <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#004067] text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                aria-label="List View"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center justify-center p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-[#004067] text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                aria-label="Map View"
              >
                <Map size={18} />
              </button>
            </div>
          </div>

          <div className="pb-24">
            {viewMode === 'list' ? (
              <div className="flex flex-col gap-[0.7rem]">
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
            ) : (
              <MapView 
                items={feedItems} 
                onSelect={(item) => setSelectedItem(item)}
              />
            )}
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
