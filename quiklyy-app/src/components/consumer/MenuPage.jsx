import React from 'react';
import { 
  User, Lock, Bell, Ban, 
  ShoppingBag, ShoppingCart, 
  Globe, Languages, CircleDollarSign, 
  Mail, MessageSquareWarning, HelpCircle, FileText, 
  LogOut, ChevronRight 
} from 'lucide-react';

export default function MenuPage({ session, onLogout }) {
  const sections = [
    {
      title: 'Account & profile',
      items: [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'password', icon: Lock, label: 'Password' },
        { id: 'notification', icon: Bell, label: 'Notification' },
        { id: 'deactivate', icon: Ban, label: 'Deactivate account' },
      ]
    },
    {
      title: 'Activity & Orders',
      items: [
        { id: 'purchase-history', icon: ShoppingBag, label: 'Purchase history' },
        { id: 'cart', icon: ShoppingCart, label: 'Cart' },
      ]
    },
    {
      title: 'Prefrence & Setting',
      items: [
        { id: 'country', icon: Globe, label: 'Country' },
        { id: 'language', icon: Languages, label: 'Language' },
        { id: 'currency', icon: CircleDollarSign, label: 'Currency' },
      ]
    },
    {
      title: 'Support & Info',
      items: [
        { id: 'contact', icon: Mail, label: 'Contact us' },
        { id: 'feedback', icon: MessageSquareWarning, label: 'Feedback and review' },
        { id: 'help', icon: HelpCircle, label: 'Help Center/ FAQ' },
        { id: 'legal', icon: FileText, label: 'Legal & About' },
      ]
    }
  ];

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen pb-20 text-gray-900 animate-slide-up">
      <div className="pt-8 pb-6">
        <h1 className="text-[28px] font-bold text-center tracking-tight">My account</h1>
      </div>

      <div className="px-5 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h2 className="text-[17px] font-bold pb-2">{section.title}</h2>
            <div className="flex flex-col">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    className="w-full flex items-center py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <Icon size={24} className="text-gray-700 mr-4" strokeWidth={1.5} />
                    <span className="flex-1 text-left font-medium text-gray-800 text-[15px]">{item.label}</span>
                    <ChevronRight size={20} className="text-gray-900" strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Logout Button */}
        <div className="pt-2">
          <button 
            onClick={onLogout}
            className="w-full flex items-center py-3.5 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={24} className="text-[#E02424] mr-4" strokeWidth={1.75} />
            <span className="flex-1 text-left font-medium text-gray-800 text-[15px]">Log out</span>
            <ChevronRight size={20} className="text-gray-900" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
