import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { propertyAPI, bookingAPI } from '../services/api';
import VirtualTour from './VirtualTour';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  UserIcon, 
  HeartIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  HomeIcon,
  CalendarIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  PlayIcon,
  CubeIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const Properties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    priceRange: { min: '', max: '' },
    bedrooms: '',
    bathrooms: '',
    sortBy: 'price-asc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample additional properties data
  const sampleProperties = [
    {
      _id: 'sample1',
      title: 'Luxury Downtown Penthouse',
      description: 'Stunning penthouse with panoramic city views, featuring modern amenities, spacious layout, and premium finishes throughout.',
      price: 1500000,
      location: 'Downtown Manhattan, NY',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      owner: { name: 'Sarah Wilson' },
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      type: 'sale',
      rating: 4.9,
      features: ['City View', 'Gym', 'Parking', 'Security']
    },
    {
      _id: 'sample2',
      title: 'Cozy Suburban Family Home',
      description: 'Perfect family home in quiet neighborhood with large backyard, updated kitchen, and close to excellent schools.',
      price: 650000,
      location: 'Westfield, NJ',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      owner: { name: 'Michael Chen' },
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: 'sale',
      rating: 4.7,
      features: ['Garden', 'Garage', 'Fireplace', 'Schools Nearby']
    },
    {
      _id: 'sample3',
      title: 'Modern Riverside Apartment',
      description: 'Contemporary apartment with river views, high-end appliances, and access to building amenities including pool and fitness center.',
      price: 3200,
      location: 'Brooklyn Heights, NY',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      owner: { name: 'Emma Rodriguez' },
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      type: 'rent',
      rating: 4.8,
      features: ['River View', 'Pool', 'Gym', 'Concierge']
    },
    {
      _id: 'sample4',
      title: 'Historic Brownstone',
      description: 'Beautifully restored historic brownstone with original details, modern updates, and private garden in trendy neighborhood.',
      price: 950000,
      location: 'Park Slope, Brooklyn',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      owner: { name: 'David Park' },
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2400,
      type: 'sale',
      rating: 4.6,
      features: ['Historic', 'Garden', 'Original Details', 'Renovated']
    },
    {
      _id: 'sample5',
      title: 'Beachfront Condo',
      description: 'Stunning oceanfront condo with floor-to-ceiling windows, private balcony, and direct beach access.',
      price: 4500,
      location: 'Miami Beach, FL',
      imageUrl: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
      owner: { name: 'Lisa Thompson' },
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      type: 'rent',
      rating: 4.9,
      features: ['Ocean View', 'Beach Access', 'Balcony', 'Resort Style']
    },
    {
      _id: 'sample6',
      title: 'Mountain Cabin Retreat',
      description: 'Rustic yet modern cabin nestled in the mountains, perfect for weekend getaways with hot tub and hiking trails nearby.',
      price: 450000,
      location: 'Aspen, CO',
      imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      owner: { name: 'Robert Martinez' },
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1900,
      type: 'sale',
      rating: 4.5,
      features: ['Mountain View', 'Hot Tub', 'Fireplace', 'Hiking Trails']
    }
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchTerm, filters]);

  const fetchProperties = async () => {
    try {
      const response = await propertyAPI.getAll();
      const apiProperties = response.data || [];
      // Combine API properties with sample properties
      const allProperties = [...apiProperties, ...sampleProperties];
      setProperties(allProperties);
    } catch (error) {
      // If API fails, use sample properties only
      setProperties(sampleProperties);
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Price range filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(property => property.price >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.priceRange.max));
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathrooms));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // For sample data, randomize order
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  };

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
    // In a real app, you'd save this to the backend
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to book a property');
      return;
    }

    if (!bookingDate || !bookingTime) {
      setError('Please select both date and time for your visit');
      return;
    }

    setBookingLoading(selectedProperty._id);
    setError('');

    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowBookingModal(false);
      setBookingDate('');
      setBookingTime('');
      setSelectedProperty(null);
      setError('');
      // Show success message
      alert(`Visit booked successfully for ${bookingDate} at ${bookingTime}! We will contact you soon.`);
    } catch (error) {
      setError('Error booking visit');
    } finally {
      setBookingLoading(null);
    }
  };

  const handleBookProperty = async (propertyId) => {
    if (!user) {
      setError('Please login to book a property');
      return;
    }

    setBookingLoading(propertyId);
    setError('');

    try {
      await bookingAPI.create({ propertyId });
      
      // Remove the booked property from the list
      setProperties(properties.filter(p => p._id !== propertyId));
      
      // Show success message
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error booking property');
    } finally {
      setBookingLoading(null);
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
            Discover Properties
          </h1>
          <p className="mt-2 text-gray-600">
            Find your perfect home from our curated selection of premium properties
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by location, title, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="$100,000"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: { ...prev.priceRange, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="$2,000,000"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: { ...prev.priceRange, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bathrooms</label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  type: '',
                  priceRange: { min: '', max: '' },
                  bedrooms: '',
                  bathrooms: '',
                  sortBy: 'price-asc'
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Property+Image';
                    }}
                  />
                  
                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      property.type === 'sale' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                  </div>

                  {/* Virtual Tour & Favorite Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowVirtualTour(true);
                      }}
                      className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors backdrop-blur-sm"
                      title="Virtual Tour"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(property._id)}
                      className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                      title={favorites.has(property._id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favorites.has(property._id) ? (
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 text-green-600 mr-1" />
                        <span className="font-bold text-gray-900">
                          ${property.price.toLocaleString()}
                          {property.type === 'rent' && <span className="text-sm font-normal text-gray-600">/month</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <HomeIcon className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.sqft} sq ft</span>
                    {property.rating && (
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{property.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {property.features && property.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {property.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{property.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Owner Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {property.owner.name}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowVirtualTour(true);
                        }}
                        className="px-3 py-1 text-green-600 border border-green-600 rounded-lg text-sm hover:bg-green-50 transition-colors flex items-center space-x-1"
                      >
                        <PlayIcon className="h-3 w-3" />
                        <span>Tour</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowPropertyModal(true);
                        }}
                        className="px-3 py-1 text-blue-600 border border-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                      >
                        Details
                      </button>
                      {user && property.owner._id !== user.id && (
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowBookingModal(true);
                          }}
                          disabled={bookingLoading === property._id}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {bookingLoading === property._id ? 'Booking...' : 'Book Visit'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProperties.length > 0 && filteredProperties.length >= 6 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Load More Properties
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Book a Visit</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-1">{selectedProperty.title}</h4>
              <p className="text-gray-600 text-sm">{selectedProperty.location}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading === selectedProperty._id}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {bookingLoading === selectedProperty._id ? 'Booking...' : 'Book Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {showPropertyModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h3>
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Image and Virtual Tour */}
                <div>
                  <div className="relative mb-4">
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setSelectedProperty(selectedProperty);
                          setShowVirtualTour(true);
                        }}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-white transition-colors"
                      >
                        <PlayIcon className="h-5 w-5" />
                        <span>Virtual Tour</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* 3D Tour Placeholder */}
                  <div className="bg-gray-100 rounded-xl p-8 text-center">
                    <CubeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">3D Virtual Tour</h4>
                    <p className="text-gray-600 text-sm mb-4">Experience this property in immersive 3D</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Launch 3D Tour
                    </button>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-6 w-6 text-green-600 mr-2" />
                      <span className="text-3xl font-bold text-gray-900">
                        ${selectedProperty.price.toLocaleString()}
                        {selectedProperty.type === 'rent' && <span className="text-lg font-normal text-gray-600">/month</span>}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedProperty._id)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {favorites.has(selectedProperty._id) ? (
                        <HeartIconSolid className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{selectedProperty.location}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{selectedProperty.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <span>{selectedProperty.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <span>{selectedProperty.sqft} sq ft</span>
                    </div>
                    {selectedProperty.rating && (
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                        <span>{selectedProperty.rating} Rating</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {selectedProperty.features && selectedProperty.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProperty.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProperty.description}</p>
                  </div>

                  {/* Owner Info */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Listed by</h4>
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">{selectedProperty.owner.name}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {user && selectedProperty.owner._id !== user.id && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setShowPropertyModal(false);
                          setShowVirtualTour(true);
                        }}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <PlayIcon className="h-5 w-5" />
                        <span>Virtual Tour</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowPropertyModal(false);
                          setShowBookingModal(true);
                        }}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <CalendarIcon className="h-5 w-5" />
                        <span>Book Visit</span>
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                        <BanknotesIcon className="h-5 w-5" />
                        <span>Make Offer</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Tour Component */}
      <VirtualTour 
        property={selectedProperty}
        isOpen={showVirtualTour}
        onClose={() => {
          setShowVirtualTour(false);
          setSelectedProperty(null);
        }}
      />
    </div>
  );
};

export default Properties;
