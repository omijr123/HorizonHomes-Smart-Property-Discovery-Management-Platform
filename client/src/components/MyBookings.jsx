import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { CalendarIcon, UserIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      setError('Error fetching bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="mt-2 text-gray-600">
            Track your property purchases and transaction history
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error mb-6">
            {error}
          </div>
        )}

        {/* Bookings Content */}
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5l7-7 7 7M9 20l7-7 7 7"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't made any property bookings yet. Start exploring!
            </p>
            <div className="mt-6">
              <Link
                to="/properties"
                className="btn btn-primary"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="property-card">
                <div className="relative">
                  <img
                    src={booking.property?.imageUrl || 'https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Property+Image'}
                    alt={booking.property?.title || 'Property'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Property+Image';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'completed' ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircleIcon className="h-3 w-3" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {booking.property?.title || 'Property Title Not Available'}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {booking.property?.description || 'Property description not available'}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Purchase Price</span>
                      <span className="text-lg font-bold text-green-600">
                        ${booking.price?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Seller: {booking.seller?.name || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
