import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProfileDetails() {
  const navigate = useNavigate();

  // State could be populated from session/DB later
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'user@example.com',
    phone: '',
    dob: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
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
        <h1 className="text-xl font-bold tracking-tight">Profile Details</h1>
      </div>

      {/* Form Fields */}
      <div className="px-2 py-6 space-y-6 max-w-lg mx-auto">
        
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your first and last name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Email Address</label>
          <div className="relative">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-4 pr-24 py-3.5 text-[15px] text-gray-500 outline-none"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#00603A] bg-[#E6F4EA] px-2.5 py-1.5 rounded-md">
                <CheckCircle2 size={14} strokeWidth={2.5} />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Date of Birth <span className="text-gray-400 font-normal">(Optional)</span></label>
          <input 
            type="date" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="MM / DD / YYYY"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black placeholder:text-gray-400 transition-colors bg-transparent"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Gender <span className="text-gray-400 font-normal">(Optional)</span></label>
          <div className="relative">
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none text-black bg-white appearance-none transition-colors"
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
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
          onClick={handleSave}
          className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
        >
          Save Changes
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-white text-gray-700 font-medium text-[16px] py-4 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}
