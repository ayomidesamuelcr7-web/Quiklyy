import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function PasswordDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdate = () => {
    // Save logic would go here
    navigate(-1);
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
        <h1 className="text-xl font-bold tracking-tight">Change Password</h1>
      </div>

      {/* Form Fields */}
      <div className="px-2 py-6 space-y-6 max-w-lg mx-auto">
        
        {/* Current Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Current Password</label>
          <div className="relative">
            <input 
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors"
            />
            <button 
              type="button"
              onClick={() => toggleVisibility('current')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">New Password</label>
          <div className="relative">
            <input 
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors"
            />
            <button 
              type="button"
              onClick={() => toggleVisibility('new')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 font-medium ml-1">At least 8 characters, 1 number</p>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Confirm New Password</label>
          <div className="relative">
            <input 
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors"
            />
            <button 
              type="button"
              onClick={() => toggleVisibility('confirm')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
        <button 
          onClick={handleUpdate}
          className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
        >
          Update Password
        </button>
        <button 
          onClick={() => {
            // Handle forgot password logic or navigation
          }}
          className="w-full bg-white text-gray-700 font-medium text-[16px] py-4 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Forgot Password?
        </button>
      </div>

    </div>
  );
}
