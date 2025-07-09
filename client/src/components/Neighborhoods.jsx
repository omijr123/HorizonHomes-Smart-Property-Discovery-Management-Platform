import React, { useState } from 'react';
import { 
  MapPinIcon, 
  HomeIcon, 
  AcademicCapIcon,
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  MapIcon,
  ListBulletIcon,
  XMarkIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  InformationCircleIcon,
  SunIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid, 
  StarIcon as StarIconSolid,
  SparklesIcon as SparklesIconSolid,
  HomeIcon as HomeIconSolid
} from '@heroicons/react/24/solid';

const Neighborhoods = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: '',
    schoolRating: '',
    lifestyle: ''
  });

  const neighborhoods = [
    {
      id: 1,
      name: 'Downtown Manhattan',
      city: 'New York',
      state: 'NY',
      description: 'Bustling urban center with world-class dining, shopping, and entertainment. Perfect for young professionals and those who love city life.',
      image: '/images/Downtown%20Apartment.jpg',
      medianPrice: 1200000,
      priceRange: '$800K - $5M+',
      schoolRating: 7.8,
      crimeRating: 6.5,
      walkScore: 98,
      transitScore: 95,
      commuteTime: '5-15 min',
      lifestyle: 'urban',
      amenities: {
        restaurants: 850,
        shops: 420,
        parks: 12,
        gyms: 65,
        hospitals: 8
      },
      highlights: [
        'Financial District proximity',
        'World-class dining scene',
        'Broadway theaters',
        'Central Park access',
        'Excellent public transit'
      ],
      mapLink: 'https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9'
    },
    {
      id: 2,
      name: 'Beverly Hills',
      city: 'Los Angeles',
      state: 'CA',
      description: 'Prestigious residential area known for luxury homes, upscale shopping, and celebrity residents. Family-friendly with excellent schools.',
      image: '/images/house1.jpg.png',
      medianPrice: 2500000,
      priceRange: '$1.5M - $50M+',
      schoolRating: 9.2,
      crimeRating: 8.5,
      walkScore: 65,
      transitScore: 45,
      commuteTime: '20-45 min',
      lifestyle: 'luxury',
      amenities: {
        restaurants: 180,
        shops: 120,
        parks: 8,
        gyms: 25,
        hospitals: 3
      },
      highlights: [
        'Top-rated schools',
        'Rodeo Drive luxury shopping',
        'Celebrity spotting opportunities',
        'Beautiful Mediterranean architecture',
        'Safe, family-friendly neighborhoods'
      ],
      mapLink: 'https://maps.app.goo.gl/dp4E1fgXNV9tccvK7'
    },
    {
      id: 3,
      name: 'Waterfront District',
      city: 'Brooklyn',
      state: 'NY',
      description: 'Historic neighborhood with stunning Manhattan views, tree-lined streets, and a strong sense of community. Perfect blend of urban and residential.',
      image: '/images/Waterfront%20Property.jpg',
      medianPrice: 850000,
      priceRange: '$500K - $3M',
      schoolRating: 8.1,
      crimeRating: 7.8,
      walkScore: 89,
      transitScore: 88,
      commuteTime: '15-30 min',
      lifestyle: 'family',
      amenities: {
        restaurants: 95,
        shops: 75,
        parks: 6,
        gyms: 18,
        hospitals: 2
      },
      highlights: [
        'Stunning Manhattan skyline views',
        'Historic brownstone architecture',
        'Brooklyn Bridge Park access',
        'Excellent restaurant scene',
        'Strong community atmosphere'
      ],
      mapLink: 'https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8'
    },
    {
      id: 4,
      name: 'Mountain View Estates',
      city: 'Miami',
      state: 'FL',
      description: 'Mediterranean-style planned community with beautiful architecture, excellent dining, and close proximity to beaches and downtown Miami.',
      image: '/images/house4.jpg',
      medianPrice: 650000,
      priceRange: '$400K - $2M',
      schoolRating: 8.8,
      crimeRating: 8.2,
      walkScore: 72,
      transitScore: 55,
      commuteTime: '15-25 min',
      lifestyle: 'suburban',
      amenities: {
        restaurants: 120,
        shops: 90,
        parks: 15,
        gyms: 22,
        hospitals: 4
      },
      highlights: [
        'Mediterranean architecture',
        'University of Miami nearby',
        'Miracle Mile shopping',
        'Beautiful golf courses',
        'Family-friendly'
      ],
      mapLink: 'https://maps.app.goo.gl/Miami123'
    },
    {
      id: 5,
      name: 'Capitol Hill',
      city: 'Seattle',
      state: 'WA',
      description: 'Vibrant neighborhood known for its arts scene, nightlife, diverse dining options, and young professional population.',
      image: '/images/apartment1.jpg',
      medianPrice: 750000,
      priceRange: '$500K - $1.5M',
      schoolRating: 7.5,
      crimeRating: 6.8,
      walkScore: 94,
      transitScore: 82,
      commuteTime: '10-20 min',
      lifestyle: 'urban',
      amenities: {
        restaurants: 180,
        shops: 110,
        parks: 10,
        gyms: 35,
        hospitals: 3
      },
      highlights: [
        'Vibrant arts scene',
        'Great nightlife',
        'Diverse dining',
        'Walkable streets',
        'Tech hub proximity'
      ],
      mapLink: 'https://maps.app.goo.gl/Seattle123'
    },
    {
      id: 6,
      name: 'Buckhead',
      city: 'Atlanta',
      state: 'GA',
      description: 'Upscale district with luxury shopping, fine dining, and high-rise living. Known as the "Beverly Hills of the South."',
      image: '/images/house5.jpg',
      medianPrice: 450000,
      priceRange: '$300K - $2M',
      schoolRating: 8.5,
      crimeRating: 7.5,
      walkScore: 68,
      transitScore: 45,
      commuteTime: '20-35 min',
      lifestyle: 'luxury',
      amenities: {
        restaurants: 150,
        shops: 200,
        parks: 12,
        gyms: 30,
        hospitals: 5
      },
      highlights: [
        'Luxury shopping destinations',
        'Award-winning fine dining',
        'Modern high-rise living',
        'Major business district',
        'Affluent professional community'
      ],
      mapLink: 'https://maps.app.goo.gl/vSL2kBrvo4wxWMF16'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getLifestyleIcon = (lifestyle) => {
    switch (lifestyle) {
      case 'urban':
        return { icon: MapPinIcon, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Urban Hub' };
      case 'luxury':
        return { icon: SparklesIconSolid, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Luxury Living' };
      case 'family':
        return { icon: HomeIconSolid, color: 'text-green-600', bg: 'bg-green-100', label: 'Family Friendly' };
      case 'suburban':
        return { icon: SunIcon, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Suburban Living' };
      default:
        return { icon: HomeIcon, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Residential' };
    }
  };

  const getFeatureBadges = (neighborhood) => {
    const badges = [];
    
    if (neighborhood.schoolRating >= 8.0) {
      badges.push({ icon: AcademicCapIcon, label: 'Top Schools', color: 'text-indigo-600', bg: 'bg-indigo-50' });
    }
    
    if (neighborhood.walkScore >= 85) {
      badges.push({ icon: MapPinIcon, label: 'Great Transit', color: 'text-green-600', bg: 'bg-green-50' });
    }
    
    if (neighborhood.amenities.restaurants > 100) {
      badges.push({ icon: BuildingStorefrontIcon, label: 'Dining Scene', color: 'text-orange-600', bg: 'bg-orange-50' });
    }
    
    return badges.slice(0, 3);
  };

  const toggleFavorite = (neighborhoodId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(neighborhoodId)) {
      newFavorites.delete(neighborhoodId);
    } else {
      newFavorites.add(neighborhoodId);
    }
    setFavorites(newFavorites);
  };

  const filteredNeighborhoods = neighborhoods.filter(neighborhood => {
    const matchesSearch = !searchTerm || 
      neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      neighborhood.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = !filters.priceRange || 
      (filters.priceRange === 'under-500k' && neighborhood.medianPrice < 500000) ||
      (filters.priceRange === '500k-1m' && neighborhood.medianPrice >= 500000 && neighborhood.medianPrice < 1000000) ||
      (filters.priceRange === '1m-2m' && neighborhood.medianPrice >= 1000000 && neighborhood.medianPrice < 2000000) ||
      (filters.priceRange === 'over-2m' && neighborhood.medianPrice >= 2000000);

    const matchesSchool = !filters.schoolRating ||
      (filters.schoolRating === '8+' && neighborhood.schoolRating >= 8) ||
      (filters.schoolRating === '7+' && neighborhood.schoolRating >= 7);

    const matchesLifestyle = !filters.lifestyle || neighborhood.lifestyle === filters.lifestyle;

    return matchesSearch && matchesPrice && matchesSchool && matchesLifestyle;
  });

  const NeighborhoodCard = ({ neighborhood }) => {
    const lifestyleInfo = getLifestyleIcon(neighborhood.lifestyle);
    const featureBadges = getFeatureBadges(neighborhood);
    const LifestyleIcon = lifestyleInfo.icon;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative">
          <img
            src={neighborhood.image}
            alt={neighborhood.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/images/house.jpg.png';
            }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
              <button 
                onClick={() => setSelectedNeighborhood(neighborhood)}
                className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
              >
                <EyeIcon className="h-4 w-4" />
                <span>Quick View</span>
              </button>
              {neighborhood.mapLink && (
                <a
                  href={neighborhood.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <MapIcon className="h-4 w-4" />
                  <span>Map</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(neighborhood.id)}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
          >
            {favorites.has(neighborhood.id) ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/70 text-white px-3 py-1 rounded-full font-bold text-sm">
              {formatCurrency(neighborhood.medianPrice)} median
            </span>
          </div>

          {/* Lifestyle Badge */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${lifestyleInfo.bg} backdrop-blur-sm`}>
              <LifestyleIcon className={`h-4 w-4 ${lifestyleInfo.color}`} />
              <span className={`text-xs font-semibold ${lifestyleInfo.color}`}>
                {lifestyleInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{neighborhood.name}</h3>
              <p className="text-gray-600 flex items-center text-sm">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {neighborhood.city}, {neighborhood.state}
              </p>
              <p className="text-sm text-gray-500 mt-1">{neighborhood.priceRange}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <StarIconSolid className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{neighborhood.schoolRating}</span>
              </div>
              <span className="text-xs text-gray-500">Schools</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {neighborhood.description}
          </p>

          {/* Feature Badges */}
          {featureBadges.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {featureBadges.map((badge, index) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${badge.bg}`}
                    >
                      <BadgeIcon className={`h-3 w-3 ${badge.color}`} />
                      <span className={`text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <MapPinIcon className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <p className="font-semibold text-blue-600">{neighborhood.walkScore}</p>
              <p className="text-gray-600">Walk</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <TruckIcon className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <p className="font-semibold text-green-600">{neighborhood.transitScore}</p>
              <p className="text-gray-600">Transit</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <ClockIcon className="h-4 w-4 text-purple-600 mx-auto mb-1" />
              <p className="font-semibold text-purple-600">{neighborhood.commuteTime}</p>
              <p className="text-gray-600">Commute</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <ShieldCheckIcon className="h-4 w-4 text-orange-600 mx-auto mb-1" />
              <p className="font-semibold text-orange-600">{neighborhood.crimeRating}/10</p>
              <p className="text-gray-600">Safety</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <BuildingStorefrontIcon className="h-4 w-4 text-orange-500" />
                <span>{neighborhood.amenities.restaurants} restaurants</span>
              </div>
              <div className="flex items-center space-x-1">
                <HomeIcon className="h-4 w-4 text-green-500" />
                <span>{neighborhood.amenities.parks} parks</span>
              </div>
              <div className="flex items-center space-x-1">
                <AcademicCapIcon className="h-4 w-4 text-blue-500" />
                <span>{neighborhood.amenities.gyms} gyms</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1 mb-4">
            {neighborhood.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))}
            {neighborhood.highlights.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{neighborhood.highlights.length - 3} more
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setSelectedNeighborhood(neighborhood)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <InformationCircleIcon className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <MapPinIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Neighborhoods
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect neighborhood that matches your lifestyle and budget
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{neighborhoods.length}</div>
              <div className="text-sm text-blue-800">Neighborhoods</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(neighborhoods.reduce((acc, n) => acc + n.walkScore, 0) / neighborhoods.length)}
              </div>
              <div className="text-sm text-green-800">Avg Walk Score</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(neighborhoods.reduce((acc, n) => acc + n.schoolRating, 0) / neighborhoods.length * 10) / 10}
              </div>
              <div className="text-sm text-purple-800">Avg School Rating</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${Math.round(neighborhoods.reduce((acc, n) => acc + n.medianPrice, 0) / neighborhoods.length / 1000)}K
              </div>
              <div className="text-sm text-orange-800">Avg Median Price</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search neighborhoods by name, city, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Price Ranges</option>
                <option value="under-500k">Under $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-2m">$1M - $2M</option>
                <option value="over-2m">Over $2M</option>
              </select>

              <select
                value={filters.schoolRating}
                onChange={(e) => setFilters({...filters, schoolRating: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All School Ratings</option>
                <option value="8+">8+ Rating</option>
                <option value="7+">7+ Rating</option>
              </select>

              <select
                value={filters.lifestyle}
                onChange={(e) => setFilters({...filters, lifestyle: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Lifestyles</option>
                <option value="urban">Urban</option>
                <option value="suburban">Suburban</option>
                <option value="family">Family-Friendly</option>
                <option value="luxury">Luxury</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing {filteredNeighborhoods.length} neighborhoods
          </p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNeighborhoods.map((neighborhood) => (
              <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredNeighborhoods.map((neighborhood) => (
              <div key={neighborhood.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-6">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.src = '/images/house.jpg.png';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{neighborhood.name}</h3>
                        <p className="text-gray-600">{neighborhood.city}, {neighborhood.state}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(neighborhood.id)}
                        className="p-2"
                      >
                        {favorites.has(neighborhood.id) ? (
                          <HeartIconSolid className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{neighborhood.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="font-semibold">{formatCurrency(neighborhood.medianPrice)}</span>
                      <span>Walk Score: {neighborhood.walkScore}</span>
                      <span>Schools: {neighborhood.schoolRating}/10</span>
                      <span>Safety: {neighborhood.crimeRating}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple Modal */}
      {selectedNeighborhood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedNeighborhood.image}
                alt={selectedNeighborhood.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = '/images/house.jpg.png';
                }}
              />
              
              <button
                onClick={() => setSelectedNeighborhood(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedNeighborhood.name}
              </h2>
              <p className="text-lg text-gray-600 flex items-center mb-4">
                <MapPinIcon className="h-5 w-5 mr-1" />
                {selectedNeighborhood.city}, {selectedNeighborhood.state}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedNeighborhood.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(selectedNeighborhood.medianPrice)}</p>
                  <p className="text-sm text-blue-700">Median Price</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-900">{selectedNeighborhood.schoolRating}/10</p>
                  <p className="text-sm text-green-700">School Rating</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-900">{selectedNeighborhood.walkScore}</p>
                  <p className="text-sm text-purple-700">Walk Score</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-900">{selectedNeighborhood.crimeRating}/10</p>
                  <p className="text-sm text-orange-700">Safety Rating</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNeighborhood.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedNeighborhood(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedNeighborhood.mapLink && (
                  <a
                    href={selectedNeighborhood.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    View on Map
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Neighborhoods;
