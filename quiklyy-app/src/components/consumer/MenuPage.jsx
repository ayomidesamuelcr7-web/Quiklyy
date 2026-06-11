import React from 'react';
import { User, Settings, Heart, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function MenuPage({ session, onLogout }) {
  const menuOptions = [
    { id: 'profile', icon: User, label: 'Edit Profile' },
    { id: 'favorites', icon: Heart, label: 'Saved Stores' },
    { id: 'settings', icon: Settings, label: 'Account Settings' },
    { id: 'support', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="animate-slide-up max-w-lg mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4 text-brand-blue">
          <User size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{session?.user?.email || 'User'}</h2>
        <p className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">Consumer Account</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {menuOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <button 
              key={option.id}
              className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== menuOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 mr-4">
                <Icon size={20} />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">{option.label}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          );
        })}
      </div>

      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );
}
