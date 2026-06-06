import { Plus, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';

export default function AddItemForm({ onAdd, submitting }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Groceries',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    hoursLeft: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      alert("Please select at least one image for this item.");
      return;
    }
    if (onAdd) {
      onAdd({
        ...formData,
        originalPrice: parseFloat(formData.originalPrice),
        discountedPrice: parseFloat(formData.discountedPrice),
        quantity: parseInt(formData.quantity, 10),
        hoursLeft: parseInt(formData.hoursLeft, 10),
        imageFiles: imageFiles
      });
      setFormData({
        name: '', category: 'Groceries', originalPrice: '', discountedPrice: '', quantity: '', hoursLeft: ''
      });
      setImageFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">List a New Short-Life Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="e.g., Organic Bananas" disabled={submitting} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none bg-white" disabled={submitting}>
            <option>Groceries</option>
            <option>Meals</option>
            <option>Bakery</option>
            <option>Produce</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Images (Required)</label>
          <div className="relative">
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleFileChange} 
              ref={fileInputRef}
              className="hidden" 
              id="image-upload"
              disabled={submitting}
            />
            <label 
              htmlFor="image-upload" 
              className={`w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer transition-colors ${imageFiles.length > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              <ImageIcon size={18} />
              <span className="truncate max-w-[150px]">
                {imageFiles.length > 0 
                  ? (imageFiles.length === 1 ? imageFiles[0].name : `${imageFiles.length} images selected`) 
                  : 'Upload Images'}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₦)</label>
          <input required type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="0.00" disabled={submitting} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₦)</label>
          <input required type="number" step="0.01" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="0.00" disabled={submitting} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input required type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="1" disabled={submitting} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expires In (Hours)</label>
          <input required type="number" name="hoursLeft" value={formData.hoursLeft} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="e.g., 4" disabled={submitting} />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end items-end mt-2">
          <button type="submit" disabled={submitting} className={`font-medium py-2.5 px-6 rounded-xl shadow-sm transition-colors flex items-center gap-2 ${submitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-900 text-white'}`}>
            <Plus size={18} />
            {submitting ? 'Publishing...' : 'Publish Listing'}
          </button>
        </div>

      </form>
    </div>
  );
}
