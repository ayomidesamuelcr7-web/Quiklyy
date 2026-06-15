import React from 'react';
import CartItemCard from '../shared/ui/CartItemCard';

export default function CartPage({ cart, onQuantityChange, onCheckout }) {
  const cartItems = Object.values(cart).filter(item => item.quantity > 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal; 

  return (
    <div className="animate-slide-up pb-32 pt-6 px-5">
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
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
        <div className="fixed bottom-[76px] left-0 right-0 px-5 py-3 bg-[#f9f9f9]/90 backdrop-blur-sm z-40 max-w-md mx-auto">
          <button 
            onClick={onCheckout}
            className="w-full flex justify-center items-center bg-[#004466] hover:bg-[#00334d] text-white font-bold text-[15px] py-4 rounded-[12px] shadow-[0_4px_12px_rgba(0,68,102,0.2)] active:scale-95 transition-transform"
          >
            Checkout (₦{total.toFixed(0)})
          </button>
        </div>
      )}
    </div>
  );
}
