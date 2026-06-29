import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

export default function FeedbackDetails() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] text-gray-900 font-sans pb-32 animate-slide-up relative">
      
      {/* Header Navigation */}
      <div className="flex items-center px-0.5 py-6 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Give us Feedback</h1>
      </div>

      <div className="px-0.5 py-8 space-y-8 max-w-lg mx-auto">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Rating System */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-[17px] font-bold text-gray-900">How was your experience?</h2>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    size={44} 
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-[#1F1F1F] text-[#1F1F1F]' 
                        : 'fill-gray-100 text-gray-200'
                    }`} 
                    strokeWidth={1}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-500 h-5">
              {rating === 1 && "Terrible"}
              {rating === 2 && "Poor"}
              {rating === 3 && "Okay"}
              {rating === 4 && "Good"}
              {rating === 5 && "Excellent"}
              {!rating && "Tap a star to rate"}
            </p>
          </div>

          {/* Text Box */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm font-medium text-gray-800">Tell us more (Optional)</label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="5"
              placeholder="What did you like? What can we improve?"
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[15px] focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Fixed Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-0.5 py-4 flex flex-col gap-3 z-10 sm:max-w-md sm:mx-auto sm:static sm:bg-transparent sm:border-0 sm:pt-6 pb-8 sm:pb-4">
            <button 
              type="submit"
              disabled={!rating}
              className={`w-full font-medium text-[16px] py-4 rounded-full transition-colors shadow-soft ${
                rating 
                  ? 'bg-[#1F1F1F] text-white hover:bg-black' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Feedback
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
