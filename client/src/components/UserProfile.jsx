import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  CameraIcon,
  HeartIcon,
  CalendarIcon,
  HomeIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    bio: 'Looking for the perfect family home in a great neighborhood.',
    preferences: {
      propertyType: 'house',
      priceRange: { min: 500000, max: 1000000 },
      bedrooms: 3,
      bathrooms: 2,
      location: 'New York, NY'
    },
    avatar: null
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  // Sample user data
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Luxury Downtown Penthouse',
      price: 1500000,
      location: 'Downtown Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      addedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Suburban Family Home',
      price: 650000,
      location: 'Westfield, NJ',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      addedDate: '2024-01-08'
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      property: 'Luxury Downtown Penthouse',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'confirmed',
      agent: 'Sarah Wilson'
    },
    {
      id: 2,
      property: 'Modern Riverside Apartment',
      date: '2024-01-18',
      time: '10:00 AM',
      status: 'completed',
      agent: 'Mike Davis'
    }
  ]);

  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: 'Family Homes in NJ',
      criteria: 'Houses, $500K-$1M, 3+ beds, Westfield area',
      alerts: true,
      created: '2024-01-05'
    },
    {
      id: 2,
      name: 'Manhattan Condos',
      criteria: 'Condos, $800K-$2M, 2+ beds, Manhattan',
      alerts: false,
      created: '2024-01-03'
    }
  ]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const ProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-16 h-16 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <CameraIcon className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 mt-1">{profileData.email}</p>
                <p className="text-gray-600">{profileData.phone}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700">{profileData.bio}</p>
            </div>

            <div className="mt-4 flex items-center text-gray-600">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{profileData.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({...prev, address: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preferences */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={profileData.preferences.propertyType}
              onChange={(e) => setProfileData(prev => ({
                ...prev, 
                preferences: {...prev.preferences, propertyType: e.target.value}
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="house">House</option>
              <option value="condo">Condominium</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              value={profileData.preferences.priceRange.min}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  priceRange: {...prev.preferences.priceRange, min: parseInt(e.target.value)}
                }
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              value={profileData.preferences.priceRange.max}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  priceRange: {...prev.preferences.priceRange, max: parseInt(e.target.value)}
                }
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const FavoritesTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Favorite Properties</h3>
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <HeartIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600">Start browsing properties and save your favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <div key={property.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                <p className="font-bold text-blue-600 mb-2">{formatCurrency(property.price)}</p>
                <p className="text-xs text-gray-500">Added {property.addedDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const BookingsTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">My Bookings</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{booking.property}</h4>
                <div className="flex items-center text-gray-600 text-sm space-x-4">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {booking.date}
                  </span>
                  <span>{booking.time}</span>
                  <span>Agent: {booking.agent}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SearchesTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Saved Searches</h3>
      <div className="space-y-4">
        {savedSearches.map((search) => (
          <div key={search.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{search.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{search.criteria}</p>
                <p className="text-xs text-gray-500">Created {search.created}</p>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={search.alerts}
                    onChange={() => {
                      setSavedSearches(prev => 
                        prev.map(s => 
                          s.id === search.id 
                            ? {...s, alerts: !s.alerts}
                            : s
                        )
                      );
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Email alerts</span>
                </label>
                <button className="text-red-600 hover:text-red-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-8">
      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key === 'sms' ? 'SMS' : key} Notifications
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'email' && 'Receive email updates about your bookings and new properties'}
                  {key === 'sms' && 'Get text messages for urgent updates'}
                  {key === 'push' && 'Browser notifications for real-time updates'}
                  {key === 'marketing' && 'Marketing emails about new features and promotions'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setNotifications(prev => ({...prev, [key]: !value}))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security & Privacy</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BellIcon className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Privacy Settings</p>
                  <p className="text-sm text-gray-600">Control your data and privacy</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'profile', name: 'Profile', icon: UserIcon },
                { id: 'favorites', name: 'Favorites', icon: HeartIcon },
                { id: 'bookings', name: 'Bookings', icon: CalendarIcon },
                { id: 'searches', name: 'Saved Searches', icon: DocumentTextIcon },
                { id: 'settings', name: 'Settings', icon: CogIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'favorites' && <FavoritesTab />}
        {activeTab === 'bookings' && <BookingsTab />}
        {activeTab === 'searches' && <SearchesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
};

export default UserProfile;
