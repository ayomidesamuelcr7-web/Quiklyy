import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShoppingBag, IconShoppingCart, IconMenu, IconMapPin } from './CustomIcons';

const TABS = [
  { id: 'shopping', label: 'Explore', Icon: IconMapPin },
  { id: 'cart', label: 'Cart', Icon: IconShoppingCart },
  { id: 'purchases', label: 'Purchase', Icon: IconShoppingBag },
  { id: 'menu', label: 'Menu', Icon: IconMenu },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f2f2f2] z-50 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center justify-center h-11 rounded-full transition-colors duration-300 ${
                isActive ? 'text-white px-4' : 'text-[#353535] px-3 hover:text-black'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#004466] rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center">
                <tab.Icon size={isActive ? 20 : 24} className="transition-all duration-300" />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                      animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                      exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
