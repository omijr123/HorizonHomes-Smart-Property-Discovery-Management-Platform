import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  PlusIcon, 
  BuildingOfficeIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MapPinIcon,
  CalculatorIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  PhoneIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const publicMenuItems = [
    { name: 'Properties', href: '/properties', icon: BuildingOfficeIcon },
    { name: 'Agents', href: '/agents', icon: UserGroupIcon },
    { name: 'Neighborhoods', href: '/neighborhoods', icon: MapPinIcon },
    { name: 'Compare', href: '/compare', icon: ScaleIcon },
    { name: 'Calculator', href: '/mortgage-calculator', icon: CalculatorIcon },
    { name: 'Reviews', href: '/reviews', icon: ChatBubbleLeftRightIcon },
    { name: 'Blog', href: '/blog', icon: DocumentTextIcon },
    { name: 'FAQ', href: '/faq', icon: QuestionMarkCircleIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
  ];

  const authenticatedMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Add Property', href: '/add-property', icon: PlusIcon },
    { name: 'My Bookings', href: '/my-bookings', icon: ShoppingBagIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: UserIcon }] : []),
  ];

  const authMenuItems = [
    { name: 'Login', href: '/login', icon: UserIcon },
    { name: 'Register', href: '/register', icon: PlusIcon },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/images/horizonhomes-logo.png" 
                alt="Horizon Homes" 
                className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-xl lg:text-2xl font-bold text-blue-600 whitespace-nowrap">
                Horizon Homes
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Public Menu Items */}
            {publicMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-200 px-2 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
                >
                  <div className="h-7 w-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium text-sm hidden xl:block">{user?.name || 'User'}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {authenticatedMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {authMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 transition-all duration-200 text-sm font-medium ${
                      item.name === 'Register'
                        ? 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-md'
                        : 'text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:block">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Public Menu Items */}
              {publicMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 rounded-lg mb-3">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    {authenticatedMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                  {authMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        item.name === 'Register'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
