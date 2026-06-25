import React from 'react';
import CartItemCard from '../shared/ui/CartItemCard';
import { ShoppingCart } from 'lucide-react';

export default function CartPage({ cart, onQuantityChange, onCheckout }) {
  const cartItems = Object.values(cart).filter(item => item.quantity > 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal; 

  return (
    <div className="animate-slide-up flex flex-col min-h-[calc(100vh-160px)] pt-6 px-5 pb-6">
      <div className="mb-4">
        <h2 className="text-[22px] font-bold text-[#353535] flex items-center gap-2">
          <ShoppingCart size={24} strokeWidth={1.5} className="text-[#353535]" />
          Cart
        </h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-10">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex-1 space-y-[7px]">
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
        <div className="mt-8">
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
