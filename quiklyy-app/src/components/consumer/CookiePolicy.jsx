import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans animate-slide-up relative flex flex-col">
      
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center px-0.5 py-6 border-b border-gray-100 shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Cookie Policy</h1>
      </div>

      <div className="px-0.5 py-8 max-w-2xl mx-auto w-full flex-1">
        <div className="prose prose-sm prose-gray max-w-none">
          <p className="font-medium text-gray-500 mb-8">Effective Date: June 27, 2026</p>
          
          <p className="text-[15px] leading-relaxed text-gray-700 mb-10">
            This Cookie Policy explains how Quiklyy ("we", "us", or "our") uses cookies and similar tracking technologies (such as local storage and session tokens) when you access our platform via our web deployment links (quiklyy-virid.vercel.app) or our mobile application framework. By continuing to navigate our platform, you consent to our use of cookies as described below.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            Cookies are small text files or data fragments stored directly on your browser or device storage when you visit a website or interact with an application. They help us remember who you are, maintain your active session, and preserve your customized app configurations so you don't have to re-input data every time you change screens.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">2. How We Use Cookies</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            We use cookies and local browser storage to power core functionalities across your user interface panel, broadly categorized into the following types:
          </p>
          
          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">A. Strictly Necessary Cookies (Essential)</h3>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">These cookies are mandatory for the platform to function securely and correctly.</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-6">
            <li><strong className="text-gray-900">Authentication:</strong> Keeps you securely logged into your profile as you navigate between the Profile, Password, and dashboard panels.</li>
            <li><strong className="text-gray-900">Shopping Cart Persistence:</strong> Remembers which items you have temporarily added to your Cart or are viewing in your Purchase history so your selection isn't lost during navigation.</li>
          </ul>

          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">B. Preference & Functional Cookies</h3>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">These cookies remember choices you make so that we can personalize your marketplace environment.</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-6">
            <li><strong className="text-gray-900">Localization Data:</strong> Saves your explicit choices from the Country, Language, and Currency selectors so your prices and translation preferences remain active across sessions.</li>
          </ul>

          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">C. Performance & Analytics Cookies</h3>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">These cookies collect anonymous technical metrics regarding how users interact with our deployed architecture.</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">App Health Tracking:</strong> Helps us measure load times, server responses, and interface latency so we can optimize performance, manage bugs, and address user inquiries raised in the Help Center/ FAQ or Feedback and review sections.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">3. Your Choices and Managing Cookies</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            You have complete control over how your device handles cookies and local storage tokens:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Browser/Device Settings:</strong> You can configure your device or web browser to block or delete cookies entirely. Please note that disabling essential cookies will restrict your ability to log in, keep items in your cart, or save custom localized configurations.</li>
            <li><strong className="text-gray-900">Account Controls:</strong> You can modify your real-time notification tokens and profile metrics directly from the Notification and Profile dashboard panels at any time.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">4. Updates to This Policy</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            We may periodically modify this Cookie Policy to keep track of new platform features, adjustments to our cloud configuration, or regulatory changes. You can always review the latest version in the Legal & About section of your account menu.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">5. Contact Us</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            If you have any questions or require support regarding our data storage and cookie practices, please contact our support desk through the Contact us form or email us at:
          </p>
          <ul className="list-none space-y-2 text-[15px] text-gray-700 mb-12">
            <li><strong className="text-gray-900">Email:</strong> <a href="mailto:support@quiklyy.com" className="text-[#1F1F1F] hover:underline font-medium">support@quiklyy.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
