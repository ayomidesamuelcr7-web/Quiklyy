import { IconShoppingBag, IconShoppingCart, IconMenu, IconMapPin } from './CustomIcons';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f2f2f2] z-50 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        
        {/* Explore Tab (Pill) */}
        <button
          onClick={() => setActiveTab('shopping')}
          className="flex items-center gap-2 bg-[#004466] text-white px-4 py-2.5 rounded-full shadow-sm"
        >
          <IconMapPin size={20} />
          <span className="text-[13px] font-medium">Explore</span>
        </button>

        {/* Cart Tab */}
        <button
          onClick={() => setActiveTab('cart')}
          className="text-[#353535]"
        >
          <IconShoppingCart size={24} />
        </button>

        {/* Purchases/Orders Tab */}
        <button
          onClick={() => setActiveTab('purchases')}
          className="text-[#353535]"
        >
          <IconShoppingBag size={24} />
        </button>

        {/* Menu Tab */}
        <button
          onClick={() => setActiveTab('menu')}
          className="text-[#353535]"
        >
          <IconMenu size={24} />
        </button>

      </div>
    </div>
  );
}
