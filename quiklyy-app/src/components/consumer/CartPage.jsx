import React from 'react';
import CartItemCard from '../shared/ui/CartItemCard';
import { IconShoppingCart } from '../shared/ui/CustomIcons';

export default function CartPage({ cart, onQuantityChange, onCheckout }) {
  const cartItems = Object.values(cart).filter(item => item.quantity > 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // Using subtotal as the total based on the screenshot showing a single Checkout (N5000) button
  const total = subtotal; 

  return (
    <div className="animate-slide-up flex flex-col h-full bg-white absolute inset-0 z-10 pt-4">
      <div className="px-5 pb-3 bg-white">
        <h2 className="text-[22px] font-bold text-[#353535] flex items-center gap-2">
          <IconShoppingCart size={24} className="text-[#353535]" />
          Cart
        </h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-5">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-3 mt-1 hide-scrollbar">
          {cartItems.map(item => (
            <CartItemCard 
              key={item.id} 
              item={item} 
              quantity={item.quantity} 
              onQuantityChange={onQuantityChange} 
              isCartView={true}
            />
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-[76px] left-0 right-0 p-5 bg-white z-40 max-w-md mx-auto">
          <button 
            onClick={onCheckout}
            className="w-full flex justify-center items-center bg-[#004466] hover:bg-[#00334d] text-white font-bold text-[15px] py-4 rounded-[12px] shadow-sm active:scale-95 transition-transform"
          >
            Checkout (₦{total.toFixed(0)})
          </button>
        </div>
      )}
    </div>
  );
}
