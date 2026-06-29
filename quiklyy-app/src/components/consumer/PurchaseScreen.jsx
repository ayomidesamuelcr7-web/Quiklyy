import React from 'react';
import RecentOrders from './RecentOrders';

export default function PurchaseScreen({ session }) {
  return (
    <div className="animate-slide-up pb-32 pt-6 px-0">
      <RecentOrders session={session} />
    </div>
  );
}
