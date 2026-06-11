import React from 'react';
import CartItemCard from '../shared/ui/CartItemCard';
import { ArrowRight } from 'lucide-react';

export default function CartPage({ cart, onQuantityChange, onCheckout }) {
  const cartItems = Object.values(cart).filter(item => item.quantity > 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax example
  const total = subtotal + tax;

  return (
    <div className="animate-slide-up max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="relative">
          Your Cart
          <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-brand-accent rounded-full"></span>
        </span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-3 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₦{tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span className="text-brand-blue">₦{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full flex justify-center items-center gap-2 bg-brand-blue hover:bg-blue-900 text-white font-semibold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Checkout Now
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
