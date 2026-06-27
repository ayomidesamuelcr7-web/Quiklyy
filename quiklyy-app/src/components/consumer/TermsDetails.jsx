import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsDetails() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans animate-slide-up relative flex flex-col">
      
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center px-5 py-6 border-b border-gray-100 shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Terms of Service</h1>
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto w-full flex-1">
        <div className="prose prose-sm prose-gray max-w-none">
          <p className="font-medium text-gray-500 mb-8">Effective Date: June 27, 2026</p>
          
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            Welcome to Quiklyy ("the Application", "we", "us", or "our"). Quiklyy is a business-to-consumer (B2C) marketplace platform designed to connect consumers with merchants offering near-expiry food items and surplus goods at reduced prices to minimize food waste.
          </p>
          
          <p className="text-[15px] leading-relaxed text-gray-700 mb-10">
            Please read these Terms of Service ("Terms") carefully before using our platform, accessing your account dashboard, or placing orders via our application. By creating an account or checking out as a guest, you agree to be bound by these Terms.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4">1. Eligibility & Account Registration</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">To access specific features of the platform, including your personalized dashboard, you must create an account.</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Account Accuracy:</strong> You agree to provide accurate, current, and complete information during registration and keep your account updated via the Profile tab.</li>
            <li><strong className="text-gray-900">Security:</strong> You are entirely responsible for safeguarding your login credentials. You can update your access tokens at any time under the Password tab.</li>
            <li><strong className="text-gray-900">Account Lifecycle:</strong> You have the right to suspend your visible marketplace presence via the Deactivate account option. We reserve the right to suspend accounts that violate platform policies or list fraudulent inventory.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">2. Marketplace Operations & Food Waste Inventory</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">Quiklyy operates strictly as an intermediary bridge facilitating transactions between independent merchants and consumers.</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Nature of Goods:</strong> You acknowledge and accept that items listed on Quiklyy are explicitly marketed as near-expiry, surplus, or clearance food items designed to combat retail waste.</li>
            <li><strong className="text-gray-900">Merchant Responsibility:</strong> Independent partner merchants are solely responsible for updating their stock levels, maintaining food hygiene compliance, and accurately describing their food items.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">3. Orders, Pricing, and Cart Interactions</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">Your activity across the checkout pipeline is governed by the following operational conditions:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Cart Reservation:</strong> Adding a near-expiry item to your Cart does not guarantee a stock hold. Transactions are officially locked only when a confirmation appears in your Purchase history.</li>
            <li><strong className="text-gray-900">Localization & Currency:</strong> Prices will be displayed based on your selected regional metrics configured via the Country, Language, and Currency selectors.</li>
            <li><strong className="text-gray-900">Finality of Sales:</strong> Because of the highly perishable and time-sensitive nature of food waste reduction inventory, all completed orders verified in your transaction log are generally non-refundable unless an item is proven to be completely unavailable upon pickup or delivery.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">4. Platform Rules & User Feedback</h2>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Acceptable Use:</strong> You agree not to manipulate store inventories, use automated scraping bots, or falsely claim orders you did not pay for.</li>
            <li><strong className="text-gray-900">Feedback Submissions:</strong> Any structural remarks or quality scores uploaded through our Feedback and review feature grant us a non-exclusive, perpetual license to use that data to iterate on system improvements and patch layout flaws without financial compensation.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">5. Limitation of Liability</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            To the maximum extent permitted by applicable laws, Quiklyy shall not be held liable for any indirect, incidental, or consequential health or financial outcomes arising from transactions negotiated on our marketplace platform. While we monitor merchant listings, the final consumption liability regarding food safety remains between the consumer and the fulfilling restaurant, grocer, or store merchant.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">6. Disclaimers & App Continuity</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            The software is provided "as is" and "as available." While hosted on modern web architecture (visible via our production environments at quiklyy-virid.vercel.app), we do not warrant that service connections will remain completely uninterrupted, secure, or free of background latency.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">7. Governing Law</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            These Terms are governed by and construed in accordance with the laws of the operating region where Quiklyy services are actively deployed.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">8. Amendments & System Contact</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            We reserve the right to modify these marketplace rules at any time. If an item in these Terms changes significantly, we will dispatch alerts based on your saved preferences inside the Notification interface.
          </p>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            If you have legal inquiries, feel free to review our supplemental documentation in the Legal & About section, or reach our compliance team directly through the built-in Help Center/ FAQ or Contact us submission flows.
          </p>
          <ul className="list-none space-y-2 text-[15px] text-gray-700 mb-12">
            <li><strong className="text-gray-900">Contact Portal:</strong> <a href="mailto:support@quiklyy.com" className="text-[#1F1F1F] hover:underline font-medium">support@quiklyy.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
