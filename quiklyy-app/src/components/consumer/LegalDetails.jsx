import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, FileText, Shield, Cookie } from 'lucide-react';

export default function LegalDetails() {
  const navigate = useNavigate();

  const DOCUMENTS = [
    { id: 'terms', icon: FileText, title: 'Terms of Service' },
    { id: 'privacy', icon: Shield, title: 'Privacy Policy' },
    { id: 'cookie', icon: Cookie, title: 'Cookie Policy' },
  ];

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-12 animate-slide-up relative flex flex-col">
      
      {/* Header Navigation */}
      <div className="flex items-center px-5 py-6 border-b border-gray-100 shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Legal & About</h1>
      </div>

      <div className="px-5 py-8 space-y-8 max-w-lg mx-auto w-full flex-1 flex flex-col">
        
        {/* Document Links */}
        <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shrink-0">
          {DOCUMENTS.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  if (doc.id === 'privacy') {
                    navigate('/consumer/privacy');
                  } else if (doc.id === 'terms') {
                    navigate('/consumer/terms');
                  } else if (doc.id === 'cookie') {
                    navigate('/consumer/cookie');
                  }
                }}
                className={`flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors ${
                  index !== DOCUMENTS.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-gray-700">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="text-[16px] font-medium text-gray-800">{doc.title}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" strokeWidth={2} />
              </button>
            );
          })}
        </div>
        
        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Footer */}
        <div className="pt-8 pb-4 text-center shrink-0">
          <div className="w-16 h-16 bg-[#1F1F1F] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
             <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">Quiklyy</p>
          <p className="text-[13px] text-gray-500 mt-1">v1.0.0 (Build 2026)</p>
          <p className="text-[12px] text-gray-400 mt-4">&copy; 2026 Quiklyy Inc. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
