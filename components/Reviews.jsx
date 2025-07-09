import React, { useState } from 'react';
import { 
  StarIcon,
  UserIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  FlagIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import AnimatedSection from '../utils/animations';

const Reviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    review: '',
    category: 'general'
  });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      title: "Exceptional Service!",
      review: "Horizon Homes made our home buying experience seamless and stress-free. Their team was professional, knowledgeable, and always available to answer our questions. We couldn't be happier with our new home!",
      category: "buying",
      date: "2024-06-15",
      helpful: 23,
      avatar: "/images/client1.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5,
      title: "Amazing Virtual Tours",
      review: "The virtual tours were incredible! We could view multiple properties without leaving our home. The technology is top-notch and really helped us narrow down our choices before in-person visits.",
      category: "virtual-tour",
      date: "2024-06-10",
      helpful: 18,
      avatar: "/images/client2.jpg"
    },
    {
      id: 3,
      name: "Mike Davis",
      rating: 5,
      title: "First-Time Buyer Success",
      review: "As first-time buyers, we were nervous about the process. Emily Rodriguez guided us every step of the way and helped us find our dream home within our budget. Highly recommend!",
      category: "buying",
      date: "2024-06-05",
      helpful: 31,
      avatar: "/images/client3.jpg"
    },
    {
      id: 4,
      name: "Lisa Chen",
      rating: 4,
      title: "Great Investment Advice",
      review: "David Thompson provided excellent investment advice for our property portfolio. His market knowledge and analytical skills helped us make informed decisions. Very professional service.",
      category: "investment",
      date: "2024-05-28",
      helpful: 15,
      avatar: "/images/client1.jpg"
    },
    {
      id: 5,
      name: "Robert Wilson",
      rating: 5,
      title: "Smooth Selling Process",
      review: "Sold our property quickly and at a great price thanks to Sarah's marketing expertise. The professional photography and virtual staging made our home stand out in the market.",
      category: "selling",
      date: "2024-05-20",
      helpful: 27,
      avatar: "/images/client2.jpg"
    },
    {
      id: 6,
      name: "Jennifer Taylor",
      rating: 5,
      title: "Outstanding Customer Service",
      review: "From start to finish, the entire team at Horizon Homes was fantastic. They went above and beyond to ensure we found the perfect home for our family. Thank you!",
      category: "general",
      date: "2024-05-15",
      helpful: 22,
      avatar: "/images/client3.jpg"
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Reviews' },
    { value: 'general', label: 'General Service' },
    { value: 'buying', label: 'Home Buying' },
    { value: 'selling', label: 'Home Selling' },
    { value: 'investment', label: 'Investment' },
    { value: 'virtual-tour', label: 'Virtual Tours' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      avatar: "/images/client1.jpg" // Default avatar
    };
    setReviews([review, ...reviews]);
    setNewReview({
      name: '',
      email: '',
      rating: 5,
      title: '',
      review: '',
      category: 'general'
    });
    setShowReviewForm(false);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Client Reviews & Feedback
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              See what our clients say about their experience with Horizon Homes
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <div>
                <span className="font-bold">{totalReviews}</span> Reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* Add Review Button */}
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="py-8 bg-blue-50 border-t border-blue-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newReview.email}
                        onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Rating *
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className="focus:outline-none"
                          >
                            <StarSolidIcon
                              className={`h-8 w-8 ${
                                star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                              } hover:text-yellow-400 transition-colors`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-gray-600 font-medium">{newReview.rating} star{newReview.rating !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Category
                      </label>
                      <select
                        value={newReview.category}
                        onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Review Title *
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Give your review a title..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={newReview.review}
                      onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Share your experience with Horizon Homes..."
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                    {review.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <HandThumbUpIcon className="h-4 w-4" />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <FlagIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Your Experience Matters
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Help others discover the Horizon Homes difference. Share your experience and help us continue to improve our services.
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>Share Your Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
