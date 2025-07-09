import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  CheckCircleIcon,
  XMarkIcon,
  BellIcon,
  HomeIcon,
  StarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Newsletter = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate newsletter signup API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubscribed(false);
    setError('');
    setEmail('');
  };

  if (variant === 'modal') {
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('closeNewsletterModal'))}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {!isSubscribed ? (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BellIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Stay Updated with Horizon Homes
                </h3>
                <p className="text-gray-600">
                  Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <HomeIcon className="h-6 w-6 text-blue-600 mb-1" />
                  <span>New Listings</span>
                </div>
                <div className="flex flex-col items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-600 mb-1" />
                  <span>Market Updates</span>
                </div>
                <div className="flex flex-col items-center">
                  <StarIcon className="h-6 w-6 text-yellow-600 mb-1" />
                  <span>Exclusive Deals</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Horizon Homes!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing. You'll receive our latest updates and exclusive property listings in your inbox.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('closeNewsletterModal'))}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white ${className}`}>
        {!isSubscribed ? (
          <div>
            <div className="flex items-center mb-4">
              <BellIcon className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-xl font-bold">Stay in the Loop</h3>
                <p className="text-blue-100">Get notified about new properties and market insights</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                {error && (
                  <p className="text-red-200 text-sm mt-1">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-300 mr-3" />
              <div>
                <h3 className="text-xl font-bold">You're all set!</h3>
                <p className="text-blue-100">Thanks for subscribing to our newsletter</p>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="text-blue-200 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default footer variant
  return (
    <div className={`bg-gray-900 text-white p-8 rounded-2xl ${className}`}>
      {!isSubscribed ? (
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <EnvelopeIcon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            Newsletter Signup
          </h3>
          <p className="text-gray-300 mb-6">
            Stay updated with the latest properties and market trends.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Successfully Subscribed!</h3>
          <p className="text-gray-300">
            Thank you for joining our newsletter. You'll receive updates soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
