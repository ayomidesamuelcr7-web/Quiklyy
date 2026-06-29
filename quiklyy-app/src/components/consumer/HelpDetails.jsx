import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    question: "How do I track my order?",
    answer: "You can track your order in real-time by going to the 'Orders' tab in your dashboard. Once a business accepts your order, you'll see a live status tracker."
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer: "Due to the nature of food rescue, all sales are final. However, if your item is significantly not as described or unsafe, please contact our support team within 24 hours for a refund."
  },
  {
    id: 3,
    question: "How can I update my payment method?",
    answer: "You can securely update or remove your saved payment methods by navigating to 'Profile > Payment Settings' in your account menu."
  }
];

export default function HelpDetails() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-12 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center px-2 py-6 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Help & Support</h1>
      </div>

      <div className="px-2 py-6 space-y-6 max-w-lg mx-auto">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={20} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="How can we help you today?"
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl text-[15px] focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-gray-900 pt-2">Frequently Asked Questions</h2>
          
          <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;
              
              return (
                <div 
                  key={faq.id} 
                  className={`flex flex-col ${index !== filteredFaqs.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="flex items-center justify-between w-full px-2 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[15px] font-medium text-gray-800 pr-4">{faq.question}</span>
                    <div className="flex-shrink-0 text-gray-400">
                      {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-2 pb-4 pt-1 text-[14px] text-gray-600 leading-relaxed bg-gray-50/50 transition-all">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredFaqs.length === 0 && (
              <div className="px-2 py-8 text-center text-gray-500 text-[15px]">
                We couldn't find any articles matching your search.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
