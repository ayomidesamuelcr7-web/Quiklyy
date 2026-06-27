import { Plus, Image as ImageIcon } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const itemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  originalPrice: z.number({ invalid_type_error: "Required" }).positive("Must be positive"),
  discountedPrice: z.number({ invalid_type_error: "Required" }).positive("Must be positive"),
  quantity: z.number({ invalid_type_error: "Required" }).int().positive("At least 1"),
  hoursLeft: z.number({ invalid_type_error: "Required" }).int().positive("At least 1"),
  imageFiles: z.any().refine((val) => val && val.length > 0, "At least one image is required")
}).refine((data) => data.discountedPrice <= data.originalPrice, {
  message: "Discounted price cannot be higher than original price",
  path: ["discountedPrice"]
});

export default function AddItemForm({ onAdd, submitting }) {
  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      category: 'Groceries',
      imageFiles: []
    }
  });

  const fileInputRef = useRef(null);
  const imageFiles = useWatch({ control, name: 'imageFiles' });

  const onSubmit = (data) => {
    if (onAdd) {
      onAdd(data);
      reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue('imageFiles', Array.from(e.target.files), { shouldValidate: true });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">List a New Short-Life Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
          <input type="text" {...register('name')} className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none`} placeholder="e.g., Organic Bananas" disabled={submitting} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select {...register('category')} className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none bg-white`} disabled={submitting}>
            <option>Groceries</option>
            <option>Meals</option>
            <option>Bakery</option>
            <option>Produce</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
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
              className={`w-full flex items-center justify-center gap-2 border ${errors.imageFiles ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 cursor-pointer transition-colors ${imageFiles && imageFiles.length > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              <ImageIcon size={18} />
              <span className="truncate max-w-[150px]">
                {imageFiles && imageFiles.length > 0 
                  ? (imageFiles.length === 1 ? imageFiles[0].name : `${imageFiles.length} images selected`) 
                  : 'Upload Images'}
              </span>
            </label>
          </div>
          {errors.imageFiles && <p className="text-red-500 text-xs mt-1">{errors.imageFiles.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₦)</label>
          <input type="number" step="0.01" {...register('originalPrice', { valueAsNumber: true })} className={`w-full border ${errors.originalPrice ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none`} placeholder="0.00" disabled={submitting} />
          {errors.originalPrice && <p className="text-red-500 text-xs mt-1">{errors.originalPrice.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₦)</label>
          <input type="number" step="0.01" {...register('discountedPrice', { valueAsNumber: true })} className={`w-full border ${errors.discountedPrice ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none`} placeholder="0.00" disabled={submitting} />
          {errors.discountedPrice && <p className="text-red-500 text-xs mt-1">{errors.discountedPrice.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input type="number" {...register('quantity', { valueAsNumber: true })} className={`w-full border ${errors.quantity ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none`} placeholder="1" disabled={submitting} />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expires In (Hours)</label>
          <input type="number" {...register('hoursLeft', { valueAsNumber: true })} className={`w-full border ${errors.hoursLeft ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue outline-none`} placeholder="e.g., 4" disabled={submitting} />
          {errors.hoursLeft && <p className="text-red-500 text-xs mt-1">{errors.hoursLeft.message}</p>}
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
