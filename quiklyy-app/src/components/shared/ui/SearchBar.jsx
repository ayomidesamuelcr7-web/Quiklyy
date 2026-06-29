import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function SearchBar() {
  const categories = ['All', 'Groceries', 'Meals', 'Bakery'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#004466] focus:border-[#004466] text-sm"
            placeholder="Search for local deals..."
          />
        </div>
        <button className="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={20} strokeWidth={1.5} />
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-0.5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-[#004466] text-white shadow-md' 
                : 'bg-[#f2f2f2] text-gray-800 hover:bg-[#e6e6e6]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
