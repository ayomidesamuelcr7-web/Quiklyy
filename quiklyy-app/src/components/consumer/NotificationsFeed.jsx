import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, MapPin, Clock, ShoppingCart } from 'lucide-react';

export default function NotificationsFeed() {
  const navigate = useNavigate();

  const NOTIFICATIONS = [
    {
      id: 1,
      type: 'location',
      icon: MapPin,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      title: 'New Surplus Items Near You!',
      message: 'A partner merchant just listed 5 near-expiry meals within 2 miles of your location.',
      time: '10 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle2,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      title: 'Order Confirmation',
      message: 'Your order #QK-9824 has been successfully reserved. The merchant is preparing your items.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'delivery',
      icon: Clock,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      title: 'Ready for Pickup / Out for Delivery',
      message: 'Great news! Your reserved items are ready for pickup at the store counter.',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'urgent',
      icon: ShoppingCart,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      title: 'Items in your cart are selling out!',
      message: 'Cart Abandonment Alert: The surplus items in your cart are in high demand. Check out soon before they are gone.',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-12 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center justify-between px-2 py-6 border-b border-gray-100">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Notifications</h1>
        </div>
        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          Mark all read
        </button>
      </div>

      <div className="max-w-lg mx-auto w-full">
        {NOTIFICATIONS.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {NOTIFICATIONS.map((notif) => {
              const Icon = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`flex gap-4 p-5 transition-colors hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50/20' : ''}`}
                >
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                    <Icon size={22} className={notif.iconColor} strokeWidth={2} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-[15px] truncate pr-2 ${notif.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-[12px] text-gray-400 whitespace-nowrap shrink-0">{notif.time}</span>
                    </div>
                    <p className={`text-[14px] leading-snug ${notif.unread ? 'text-gray-700' : 'text-gray-500'}`}>
                      {notif.message}
                    </p>
                  </div>
                  
                  {/* Unread Indicator */}
                  {notif.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#1F1F1F] mt-2 shrink-0"></div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-2 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Bell size={28} />
            </div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-1">No new notifications</h3>
            <p className="text-[14px] text-gray-500">We'll let you know when there are updates to your orders or new surplus items.</p>
          </div>
        )}
      </div>
    </div>
  );
}
