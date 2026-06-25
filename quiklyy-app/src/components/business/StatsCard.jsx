import { TrendingUp, Package, Activity } from 'lucide-react';

export default function StatsCard({ revenueSaved = 0, itemsSoldToday = 0, activeListings = 0 }) {
  const stats = [
    { label: 'Revenue Saved', value: `₦${Number(revenueSaved).toFixed(2)}`, icon: <TrendingUp size={20} />, color: 'bg-green-100 text-green-600' },
    { label: 'Items Sold Today', value: itemsSoldToday.toString(), icon: <Package size={20} />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Listings', value: activeListings.toString(), icon: <Activity size={20} />, color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
