import ProductCard from '../shared/ui/ProductCard';

export default function DealFeed({ items, onSelect }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No deals available right now. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
