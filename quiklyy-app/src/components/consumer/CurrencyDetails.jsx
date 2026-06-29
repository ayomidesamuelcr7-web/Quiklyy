import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
];

export default function CurrencyDetails() {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleApply = () => {
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
        <h1 className="text-xl font-bold tracking-tight">Select Currency</h1>
      </div>

      <div className="px-0.5 py-6 space-y-6 max-w-lg mx-auto">
        
        {/* Currency List */}
        <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden">
          {CURRENCIES.map((currency, index) => (
            <button
              key={currency.code}
              onClick={() => setSelectedCurrency(currency.code)}
              className={`flex items-center justify-between w-full px-0.5 py-4 text-left hover:bg-gray-50 transition-colors ${
                index !== CURRENCIES.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[16px] font-semibold text-gray-800 mr-4">
                  {currency.symbol}
                </span>
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-gray-800">{currency.code}</span>
                  <span className="text-[13px] text-gray-500 mt-0.5">{currency.name}</span>
                </div>
              </div>
              
              {selectedCurrency === currency.code && (
                <Check size={20} className="text-[#1F1F1F]" strokeWidth={2.5} />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-0.5 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
        <button 
          onClick={handleApply}
          className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
        >
          Apply Currency
        </button>
      </div>

    </div>
  );
}
