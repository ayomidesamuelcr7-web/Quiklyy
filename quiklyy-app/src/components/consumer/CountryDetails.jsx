import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Check } from 'lucide-react';

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

export default function CountryDetails() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
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
        <h1 className="text-xl font-bold tracking-tight">Select Country / Region</h1>
      </div>

      <div className="px-0.5 py-6 space-y-6 max-w-lg mx-auto">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={20} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for your country..."
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl text-[15px] focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Country List */}
        <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden">
          {filteredCountries.map((country, index) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`flex items-center w-full px-0.5 py-4 text-left hover:bg-gray-50 transition-colors ${
                index !== filteredCountries.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-2xl mr-4">{country.flag}</span>
              <span className="flex-1 text-[16px] font-medium text-gray-800">{country.name}</span>
              {selectedCountry === country.code && (
                <Check size={20} className="text-[#1F1F1F]" strokeWidth={2.5} />
              )}
            </button>
          ))}
          {filteredCountries.length === 0 && (
            <div className="px-0.5 py-8 text-center text-gray-500">
              No countries found.
            </div>
          )}
        </div>

      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-0.5 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
        <button 
          onClick={handleConfirm}
          className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
        >
          Confirm Region
        </button>
      </div>

    </div>
  );
}
