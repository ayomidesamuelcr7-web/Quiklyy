import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function DeactivateDetails() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');

  const handleDeactivate = () => {
    // Deactivation logic would go here
    navigate('/');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-32 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center px-2 py-6 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Deactivate Account</h1>
      </div>

      <div className="px-2 py-8 space-y-8 max-w-lg mx-auto">
        
        {/* Warning Section */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} strokeWidth={2} />
          </div>
          <h2 className="text-[17px] font-bold text-red-700 mb-2">Are you sure?</h2>
          <p className="text-[14px] text-red-600 leading-snug">
            Are you sure you want to deactivate your account? This action will temporarily disable your profile and remove your access. You can reactivate it at any time by logging back in.
          </p>
        </div>

        {/* Reason Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Reason for leaving <span className="text-gray-400 font-normal">(Optional)</span></label>
          <div className="relative">
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black bg-white appearance-none transition-colors"
            >
              <option value="" disabled>Select a reason</option>
              <option value="Taking a break">Taking a break</option>
              <option value="Too many emails/notifications">Too many emails/notifications</option>
              <option value="Privacy concerns">Privacy concerns</option>
              <option value="Not useful anymore">Not useful anymore</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom arrow for select */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
        <button 
          onClick={handleDeactivate}
          className="w-full bg-[#E02424] text-white font-medium text-[16px] py-4 rounded-full hover:bg-red-700 transition-colors shadow-soft"
        >
          Deactivate My Account
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-white text-gray-700 font-medium text-[16px] py-4 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Keep My Account
        </button>
      </div>

    </div>
  );
}
