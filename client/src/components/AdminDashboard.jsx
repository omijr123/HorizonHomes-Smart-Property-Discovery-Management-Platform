import React, { useEffect, useState } from 'react';
import { bookingAPI, propertyAPI } from '../services/api';
import { 
  UserIcon, 
  CurrencyDollarIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  ClockIcon,
  HomeIcon,
  EyeIcon,
  HeartIcon,
  ChartBarIcon,
  UsersIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  XMarkIcon,
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Sample data for comprehensive dashboard
  const sampleBookings = [
    {
      _id: 'booking1',
      property: { title: 'Luxury Downtown Penthouse', _id: 'prop1' },
      user: { name: 'John Smith', email: 'john@example.com', _id: 'user1' },
      date: '2024-01-15',
      status: 'confirmed',
      createdAt: '2024-01-10',
      notes: 'Interested in quick closing'
    },
    {
      _id: 'booking2',
      property: { title: 'Suburban Family Home', _id: 'prop2' },
      user: { name: 'Sarah Johnson', email: 'sarah@example.com', _id: 'user2' },
      date: '2024-01-18',
      status: 'pending',
      createdAt: '2024-01-12',
      notes: 'First-time buyer'
    },
    {
      _id: 'booking3',
      property: { title: 'Modern Riverside Apartment', _id: 'prop3' },
      user: { name: 'Mike Davis', email: 'mike@example.com', _id: 'user3' },
      date: '2024-01-20',
      status: 'completed',
      createdAt: '2024-01-08',
      notes: 'Excellent showing'
    }
  ];

  const sampleUsers = [
    {
      _id: 'user1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'buyer',
      joinDate: '2024-01-01',
      totalBookings: 3,
      status: 'active',
      phone: '555-0123'
    },
    {
      _id: 'user2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'seller',
      joinDate: '2023-12-15',
      totalBookings: 1,
      status: 'active',
      phone: '555-0124'
    },
    {
      _id: 'user3',
      name: 'Mike Davis',
      email: 'mike@example.com',
      role: 'buyer',
      joinDate: '2024-01-05',
      totalBookings: 2,
      status: 'inactive',
      phone: '555-0125'
    }
  ];

  const sampleProperties = [
    {
      _id: 'prop1',
      title: 'Luxury Downtown Penthouse',
      price: 1500000,
      location: 'Downtown Manhattan, NY',
      status: 'active',
      views: 245,
      favorites: 18,
      bookings: 5,
      owner: { name: 'Property Group LLC' },
      createdAt: '2023-12-01'
    },
    {
      _id: 'prop2',
      title: 'Suburban Family Home',
      price: 650000,
      location: 'Westfield, NJ',
      status: 'pending',
      views: 189,
      favorites: 12,
      bookings: 3,
      owner: { name: 'Michael Chen' },
      createdAt: '2023-12-10'
    },
    {
      _id: 'prop3',
      title: 'Modern Riverside Apartment',
      price: 3200,
      location: 'Brooklyn Heights, NY',
      status: 'sold',
      views: 156,
      favorites: 8,
      bookings: 7,
      owner: { name: 'Emma Rodriguez' },
      createdAt: '2023-11-20'
    }
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // In a real app, these would be separate API calls
      setBookings(sampleBookings);
      setUsers(sampleUsers);
      setProperties(sampleProperties);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const deleteItem = (type, id) => {
    if (type === 'booking') {
      setBookings(prev => prev.filter(item => item._id !== id));
    } else if (type === 'user') {
      setUsers(prev => prev.filter(item => item._id !== id));
    } else if (type === 'property') {
      setProperties(prev => prev.filter(item => item._id !== id));
    }
    setShowModal(false);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalProperties: properties.length,
    activeProperties: properties.filter(p => p.status === 'active').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRevenue: properties.reduce((sum, prop) => sum + (prop.status === 'sold' ? prop.price : 0), 0),
    avgPropertyPrice: properties.length > 0 ? properties.reduce((sum, prop) => sum + prop.price, 0) / properties.length : 0
  };

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <HomeIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Properties</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <UsersIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking._id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{booking.property.title}</p>
                  <p className="text-sm text-gray-600">{booking.user.name} • {booking.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Properties</h3>
          <div className="space-y-4">
            {properties
              .sort((a, b) => (b.views + b.favorites + b.bookings) - (a.views + a.favorites + a.bookings))
              .slice(0, 5)
              .map((property) => (
                <div key={property._id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{property.views} views</p>
                    <p className="text-sm text-gray-600">{property.bookings} bookings</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BookingsTab = () => (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
          <button
            onClick={() => openModal('booking')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Booking
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="mt-4 flex space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property & User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings
              .filter(booking => 
                (!searchTerm || 
                  booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  booking.user.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) &&
                (!filterStatus || booking.status === filterStatus)
              )
              .map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{booking.property.title}</p>
                      <p className="text-sm text-gray-600">{booking.user.name} • {booking.user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openModal('booking', booking)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openModal('delete', { type: 'booking', item: booking })}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PropertiesTab = () => (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Properties Management</h3>
          <button
            onClick={() => openModal('property')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Property
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-500">Owner: {property.owner.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(property.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{property.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{property.favorites} favorites</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{property.bookings} bookings</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : property.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('property', property)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openModal('delete', { type: 'property', item: property })}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Users Management</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'seller'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <p>{user.totalBookings} bookings</p>
                    <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal('user', user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openModal('delete', { type: 'user', item: user })}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Horizon Homes Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage properties, bookings, and users across the platform
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'bookings', name: 'Bookings', icon: CalendarIcon },
                { id: 'properties', name: 'Properties', icon: HomeIcon },
                { id: 'users', name: 'Users', icon: UsersIcon }
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
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'bookings' && <BookingsTab />}
        {activeTab === 'properties' && <PropertiesTab />}
        {activeTab === 'users' && <UsersTab />}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'delete' ? 'Confirm Delete' : `${selectedItem ? 'Edit' : 'Add'} ${modalType}`}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {modalType === 'delete' ? (
                <div>
                  <div className="flex items-center mb-4">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-3" />
                    <p className="text-gray-700">
                      Are you sure you want to delete this {selectedItem?.type}? This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteItem(selectedItem.type, selectedItem.item._id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    {modalType} management functionality would be implemented here.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
