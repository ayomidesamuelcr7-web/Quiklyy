import { Store, LogOut } from 'lucide-react';

export default function BusinessHeader({ onLogout }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
          <span className="text-white font-bold text-xl leading-none">Q</span>
        </div>
        <span className="text-brand-blue font-bold text-xl tracking-tight">Quiklyy Business</span>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-brand-blue">
          <Store size={16} />
          <span className="hidden sm:inline">Merchant</span>
        </div>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
        <button 
          onClick={onLogout}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
