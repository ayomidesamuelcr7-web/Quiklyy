import { ShoppingBag, ShoppingCart, Menu, MapPin } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f2f2f2] z-50 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        
        {/* Explore Tab (Pill) */}
        <button
          onClick={() => setActiveTab('shopping')}
          className="flex items-center gap-2 bg-[#004466] text-white px-4 py-2.5 rounded-full shadow-sm"
        >
          <MapPin size={20} strokeWidth={2} />
          <span className="text-[13px] font-medium">Explore</span>
        </button>

        {/* Cart Tab */}
        <button
          onClick={() => setActiveTab('cart')}
          className="text-[#353535]"
        >
          <ShoppingCart size={24} strokeWidth={1.5} />
        </button>

        {/* Purchases/Orders Tab */}
        <button
          onClick={() => setActiveTab('purchases')}
          className="text-[#353535]"
        >
          <ShoppingBag size={24} strokeWidth={1.5} />
        </button>

        {/* Menu Tab */}
        <button
          onClick={() => setActiveTab('menu')}
          className="text-[#353535]"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

      </div>
    </div>
  );
}
