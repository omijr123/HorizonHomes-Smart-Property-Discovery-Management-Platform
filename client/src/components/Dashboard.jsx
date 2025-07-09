import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { propertyAPI, bookingAPI } from '../services/api';
import { PlusIcon, BuildingOfficeIcon, ShoppingBagIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({ 
    myProperties: 0,
    myBookings: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [isAdmin]);

  const fetchStats = async () => { 
    try {
      const [myPropsResponse, myBookingsResponse] = await Promise.all([
        propertyAPI.getMyProperties(),
        bookingAPI.getMyBookings(),
      ]);

      let totalBookings = 0;
      if (isAdmin) {
        const allBookingsResponse = await bookingAPI.getAllBookings();
        totalBookings = allBookingsResponse.data.length;
      }

      setStats({
        myProperties: myPropsResponse.data.length,
        myBookings: myBookingsResponse.data.length,
        totalBookings,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your property portfolio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Properties</p>
                <p className="text-3xl font-bold text-blue-600">{stats.myProperties}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Bookings</p>
                <p className="text-3xl font-bold text-green-600">{stats.myBookings}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingBagIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Browse</p>
                <p className="text-lg font-semibold text-purple-600">Properties</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.totalBookings}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <UserGroupIcon className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/add-property"
                  className="w-full btn btn-primary flex items-center justify-center space-x-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add New Property</span>
                </Link>
                <Link
                  to="/properties"
                  className="w-full btn btn-secondary flex items-center justify-center space-x-2"
                >
                  <BuildingOfficeIcon className="h-5 w-5" />
                  <span>Browse Properties</span>
                </Link>
                <Link
                  to="/my-bookings"
                  className="w-full btn btn-secondary flex items-center justify-center space-x-2"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>View My Bookings</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="w-full btn btn-success flex items-center justify-center space-x-2"
                  >
                    <ChartBarIcon className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {stats.myProperties} properties listed
                    </p>
                    <p className="text-xs text-gray-500">Manage your listings</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingBagIcon className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {stats.myBookings} bookings made
                    </p>
                    <p className="text-xs text-gray-500">Track your purchases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
