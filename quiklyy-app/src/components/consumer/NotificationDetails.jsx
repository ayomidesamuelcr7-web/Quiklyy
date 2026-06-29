import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotificationDetails() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    push: true,
    email: false,
    sms: true
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save logic would go here
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-32 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center px-0.5 py-6 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Notification Preferences</h1>
      </div>

      {/* Toggles */}
      <div className="px-0.5 py-8 space-y-8 max-w-lg mx-auto">
        
        {/* Push Notifications */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900 leading-tight mb-1">Push Notifications</h3>
            <p className="text-[14px] text-gray-500 leading-snug">Alerts about order updates and offers directly on your device.</p>
          </div>
          <button 
            type="button"
            onClick={() => handleToggle('push')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences.push ? 'bg-[#1F1F1F]' : 'bg-gray-200'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences.push ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Email Notifications */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900 leading-tight mb-1">Email Notifications</h3>
            <p className="text-[14px] text-gray-500 leading-snug">Weekly newsletters, receipts, and account updates.</p>
          </div>
          <button 
            type="button"
            onClick={() => handleToggle('email')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences.email ? 'bg-[#1F1F1F]' : 'bg-gray-200'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences.email ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* SMS Notifications */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900 leading-tight mb-1">SMS Notifications</h3>
            <p className="text-[14px] text-gray-500 leading-snug">Real-time delivery status tracking.</p>
          </div>
          <button 
            type="button"
            onClick={() => handleToggle('sms')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences.sms ? 'bg-[#1F1F1F]' : 'bg-gray-200'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences.sms ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-0.5 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
        <button 
          onClick={handleSave}
          className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
        >
          Save Preferences
        </button>
      </div>

    </div>
  );
}
