import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
        <h1 className="text-xl font-bold tracking-tight">Privacy Policy</h1>
      </div>

      <div className="px-5 py-8 max-w-2xl mx-auto w-full flex-1">
        <div className="prose prose-sm prose-gray max-w-none">
          <p className="font-medium text-gray-500 mb-2">Effective Date: June 27, 2026</p>
          <p className="font-medium text-gray-500 mb-8">Last Updated: June 27, 2026</p>
          
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            Welcome to Quiklyy ("we," "our," or "us"). We are committed to protecting your personal data and your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hosted at quiklyy-virid.vercel.app or use our mobile application (collectively, the "Service").
          </p>
          
          <p className="text-[15px] leading-relaxed text-gray-700 mb-10">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">We collect information about you in a range of ways when you use our Service.</p>
          
          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">A. Personal Data You Provide to Us</h3>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-6">
            <li><strong className="text-gray-900">Account & Profile Information:</strong> When you register an account, we collect your full name, email address, phone number, password, and optional details like date of birth or gender.</li>
            <li><strong className="text-gray-900">Preferences & Settings:</strong> We store choices you make regarding your account preferences, such as your selected country, language, and currency settings.</li>
            <li><strong className="text-gray-900">Feedback & Communications:</strong> We collect information when you contact our customer support, submit feedback, complete a review, or participate in help center forums.</li>
          </ul>

          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">B. Activity, Orders, and Transaction Data</h3>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-6">
            <li><strong className="text-gray-900">Cart & Purchase History:</strong> We collect details of items you add to your cart and information about the transactions you make through the platform, including the types of near-expiry items purchased, total spending, and timestamps of orders.</li>
          </ul>

          <h3 className="text-[16px] font-semibold text-gray-900 mb-2 mt-6">C. Information Collected Automatically</h3>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Location Data:</strong> To connect you with nearby merchants and display relevant local marketplace offers, we may request access to or track geo-location information from your mobile device (latitude and longitude), either continuously or while you are using the application.</li>
            <li><strong className="text-gray-900">Device and Usage Data:</strong> We automatically collect server log information, IP addresses, browser types, device operating systems, access times, and pages viewed directly before or after accessing the Service.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">2. How We Use Your Information</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">We use the information we collect to operate, maintain, and improve our marketplace. Specifically, we use your data to:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li>Create, manage, and secure your user profile and account.</li>
            <li>Process transactions, manage your shopping cart, and maintain your purchase history.</li>
            <li>Provide precise localized search results and merchant matching using your device location.</li>
            <li>Send you administrative notices, order updates, and support messages.</li>
            <li>Deliver promotional communications and notification preferences based on your toggled alerts.</li>
            <li>Analyze usage trends to improve the user interface and overall marketplace efficiency.</li>
            <li>Respond to your customer service requests, product reviews, and feedback.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">3. Sharing and Disclosure of Your Information</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">We do not sell your personal data. We may share your information only in the following scenarios:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">With Third-Party Service Providers:</strong> We share information with third-party vendors, hosting providers (such as Vercel), database infrastructure providers, and payment processors who perform services on our behalf.</li>
            <li><strong className="text-gray-900">With Partners and Merchants:</strong> Aggregated or necessary order data may be shared with participating merchants to fulfill your purchases.</li>
            <li><strong className="text-gray-900">For Legal Reasons:</strong> We may disclose your information if required to do so by law, court order, or government regulation, or to protect the safety, rights, or property of Quiklyy, our users, or the public.</li>
            <li><strong className="text-gray-900">Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your personal data may be transferred as a business asset.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">4. Your Rights and Choices</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">You have control over how your data is handled within your account settings:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 mb-8">
            <li><strong className="text-gray-900">Profile Control:</strong> You can review, update, or correct your personal details, password, and contact information at any time via your Account Profile screen.</li>
            <li><strong className="text-gray-900">Notification Preferences:</strong> You can opt out of push alerts, marketing emails, or SMS tracking via the Notification toggle settings.</li>
            <li><strong className="text-gray-900">Location Access:</strong> You can disable location tracking at any time through your mobile device's system settings, though doing so may limit your ability to view nearby items.</li>
            <li><strong className="text-gray-900">Account Deactivation:</strong> You can temporarily disable or request the deactivation of your account through the settings interface.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">5. Security of Your Data</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            We use appropriate technical and organizational security measures to protect your personal data from unauthorized access, loss, misuse, or alteration. However, please remember that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">6. Children's Privacy</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal data, we will take immediate steps to delete such information from our servers.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">7. Changes to This Privacy Policy</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
            We may update this Privacy Policy from time to time to reflect changes in our practices or operational requirements. We will notify you of any major changes by updating the "Last Updated" date at the top of this policy or through explicit notifications within the application interface.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">8. Contact Us</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            If you have any questions, concerns, or complaints about this Privacy Policy or our data management workflows, please contact us through our interface options or via:
          </p>
          <ul className="list-none space-y-2 text-[15px] text-gray-700 mb-12">
            <li><strong className="text-gray-900">Email:</strong> <a href="mailto:support@quiklyy.com" className="text-[#1F1F1F] hover:underline font-medium">support@quiklyy.com</a></li>
            <li><strong className="text-gray-900">Support Portal:</strong> <a href="https://quiklyy-virid.vercel.app/support" className="text-[#1F1F1F] hover:underline font-medium">quiklyy-virid.vercel.app/support</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
