import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Phone, Paperclip } from 'lucide-react';

export default function ContactDetails() {
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // Send logic would go here
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-32 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center px-5 py-6 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Contact Support</h1>
      </div>

      <div className="px-5 py-6 space-y-8 max-w-lg mx-auto">
        
        {/* Contact Options */}
        <div className="space-y-3">
          <a href="mailto:support@quiklyy.com" className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-gray-800">
              <Mail size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-gray-900">Email Support</span>
              <span className="text-[13px] text-gray-500 mt-0.5">support@quiklyy.com</span>
            </div>
          </a>

          <button className="w-full flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-gray-800">
              <MessageCircle size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-gray-900">Live Chat</span>
              <span className="text-[13px] text-gray-500 mt-0.5">Chat with our support team 24/7</span>
            </div>
          </button>

          <a href="tel:+18000000000" className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-gray-800">
              <Phone size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-gray-900">Phone Support</span>
              <span className="text-[13px] text-gray-500 mt-0.5">+1 (800) XXX-XXXX (Available Mon-Fri)</span>
            </div>
          </a>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-[18px] font-bold text-gray-900 mb-4">Send us a message</h2>
          <form onSubmit={handleSend} className="space-y-4">
            
            {/* Subject */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-800">Subject</label>
              <input 
                type="text" 
                placeholder="Briefly describe the issue"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors placeholder:text-gray-400"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-800">Message / Issue details</label>
              <textarea 
                rows="4"
                placeholder="How can we help you today?"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors placeholder:text-gray-400 resize-none"
                required
              />
            </div>

            {/* Attachment */}
            <div>
              <button type="button" className="flex items-center text-[#1F1F1F] font-medium text-[15px] py-2 hover:opacity-80 transition-opacity">
                <Paperclip size={18} className="mr-2" />
                Add Attachment
              </button>
            </div>

            {/* Submit */}
            <div className="pt-4 pb-12">
              <button 
                type="submit"
                className="w-full bg-[#1F1F1F] text-white font-medium text-[16px] py-4 rounded-full hover:bg-black transition-colors shadow-soft"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
