import { X, MapPin, Package, Clock, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Badge from '../shared/ui/Badge';

export default function ProductModal({ item, onClose, onReserve, reserving }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : item.image);

  if (!item) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < item.quantity) setQuantity(quantity + 1);
  };

  const handleReserve = () => {
    onReserve(item, quantity);
  };

  const hasMultipleImages = item.imageUrls && item.imageUrls.length > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-900 rounded-full shadow-sm transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col relative">
          <div className="relative w-full h-64 md:h-[400px]">
            <img 
              src={activeImage} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge hoursLeft={item.hoursLeft} />
            </div>
          </div>
          
          {hasMultipleImages && (
            <div className="flex gap-2 p-4 overflow-x-auto hide-scrollbar bg-white/50">
              {item.imageUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(url)}
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${activeImage === url ? 'border-brand-blue' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={url} alt={`${item.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="mb-6">
            <div className="text-sm font-medium text-brand-blue mb-2 tracking-wide uppercase">{item.category}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <span className="font-semibold text-gray-700">{item.storeName}</span>
              <span className="mx-2">•</span>
              <MapPin size={16} className="mr-1 text-gray-400" />
              <span>{item.distance}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <Clock className="text-orange-500" size={24} />
              <div>
                <p className="text-sm font-medium text-orange-800">Ending Soon</p>
                <p className="text-xs text-orange-600">Only {item.hoursLeft} hours left to grab this deal!</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Package className="text-gray-500" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.quantity} items available</p>
                <p className="text-xs text-gray-500">Stock is limited. First come, first served.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Price per item</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-brand-blue">₦{item.discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-400 line-through">₦{item.originalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  Save ₦{(item.originalPrice - item.discountedPrice).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button 
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || reserving}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-brand-blue hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button 
                  onClick={handleIncrease}
                  disabled={quantity >= item.quantity || reserving}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-brand-blue hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  +
                </button>
              </div>

              {/* Reserve Button */}
              <button 
                onClick={handleReserve}
                disabled={reserving}
                className="flex-1 bg-brand-accent hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-sm transition-all active:scale-95 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {reserving ? 'Reserving...' : (
                  <>
                    <ShoppingBag size={20} />
                    Reserve {quantity} for ₦{(item.discountedPrice * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
