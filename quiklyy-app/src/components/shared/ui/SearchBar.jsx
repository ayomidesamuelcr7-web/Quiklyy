import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchBar() {
  const categories = ['All', 'Groceries', 'Meals', 'Bakery', 'Dairy', 'Produce'];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue sm:text-sm transition-shadow shadow-sm"
            placeholder="Search for local deals..."
          />
        </div>
        <button className="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((category, idx) => (
          <button
            key={category}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              idx === 0 
                ? 'bg-brand-blue text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
