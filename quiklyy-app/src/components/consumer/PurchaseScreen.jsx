import React from 'react';
import RecentOrders from './RecentOrders';

export default function PurchaseScreen({ session }) {
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="relative">
          Recent Purchases
          <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-brand-accent rounded-full"></span>
        </span>
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <RecentOrders session={session} />
      </div>
    </div>
  );
}
