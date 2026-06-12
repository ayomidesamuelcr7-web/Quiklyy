import { IconFilterSliders } from './CustomIcons';

export default function SearchBar() {
  const categories = ['All', 'Groceries', 'Meals', 'Bakery'];

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
        <button className="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-white text-gray-600">
          <IconFilterSliders size={20} />
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((category, idx) => (
          <button
            key={category}
            className={`whitespace-nowrap px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              idx === 0 
                ? 'bg-[#004466] text-white' 
                : 'bg-[#f2f2f2] text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
