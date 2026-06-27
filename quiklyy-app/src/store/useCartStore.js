import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: {},

  // Set the exact quantity of an item
  updateQuantity: (item, quantity) => {
    set((state) => {
      const newCart = { ...state.cart };
      
      if (quantity <= 0) {
        delete newCart[item.id];
      } else {
        // Limit to available stock
        const maxStock = item.stock || item.quantity || 9;
        const finalQty = Math.min(Math.max(0, quantity), maxStock);
        
        newCart[item.id] = { ...item, quantity: finalQty };
      }
      
      return { cart: newCart };
    });
  },

  // Clear all items from the cart
  clearCart: () => set({ cart: {} }),

  // Helper selector to get items array
  getCartItems: () => {
    return Object.values(get().cart).filter(item => item.quantity > 0);
  },

  // Helper selector to calculate subtotal
  getCartTotal: () => {
    return Object.values(get().cart).reduce(
      (acc, item) => acc + (item.price * item.quantity), 
      0
    );
  }
}));

export default useCartStore;
