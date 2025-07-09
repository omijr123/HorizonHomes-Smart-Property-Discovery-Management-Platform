import React, { useState } from 'react';
import {
  ScaleIcon,
  HomeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CalendarIcon,
  SparklesIcon,
  XMarkIcon,
  PlusIcon,
  CheckIcon,
  HeartIcon,
  ShareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PropertyComparison = () => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showPropertySelector, setShowPropertySelector] = useState(false);

  // Sample properties data with local images
  const availableProperties = [
    {
      id: 1,
      name: 'Modern Family House',
      location: 'New York, NY',
      price: 250000,
      type: 'House',
      area: 2500,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2019,
      image: '/images/modernfamilyhouse.jpg',
      features: ['Swimming Pool', 'Garage', 'Garden', 'Modern Kitchen'],
      description: 'Beautiful modern family house with spacious rooms and premium amenities.'
    },
    {
      id: 2,
      name: 'Downtown Apartment',
      location: 'San Francisco, CA',
      price: 350000,
      type: 'Apartment',
      area: 1200,
      bedrooms: 2,
      bathrooms: 1,
      yearBuilt: 2020,
      image: '/images/Downtown%20Apartment.jpg',
      features: ['City View', 'Fitness Center', 'Security', 'Balcony'],
      description: 'Stunning downtown apartment with panoramic city views.'
    },
    {
      id: 3,
      name: 'Mountain View Cottage',
      location: 'Denver, CO',
      price: 320000,
      type: 'House',
      area: 1800,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2015,
      image: '/images/house4.jpg',
      features: ['Mountain View', 'Fireplace', 'Large Deck', 'Hiking Trails'],
      description: 'Cozy cottage with breathtaking mountain views and outdoor access.'
    },
    {
      id: 4,
      name: 'Luxury Penthouse',
      location: 'Miami, FL',
      price: 780000,
      type: 'Apartment',
      area: 2800,
      bedrooms: 3,
      bathrooms: 3,
      yearBuilt: 2021,
      image: '/images/Luxury%20Penthouse.jpg',
      features: ['Ocean View', 'Private Elevator', 'Rooftop Access', 'Concierge'],
      description: 'Ultra-luxurious penthouse with premium finishes and amenities.'
    },
    {
      id: 5,
      name: 'Cozy Studio Apartment',
      location: 'Chicago, IL',
      price: 120000,
      type: 'Apartment',
      area: 650,
      bedrooms: 1,
      bathrooms: 1,
      yearBuilt: 2018,
      image: '/images/Cozy%20Studio%20Apartment.jpg',
      features: ['Downtown Location', 'Modern Design', 'High Ceilings', 'Natural Light'],
      description: 'Perfect studio apartment for urban living with modern amenities.'
    },
    {
      id: 6,
      name: 'Elegant Brick House',
      location: 'Boston, MA',
      price: 480000,
      type: 'House',
      area: 2200,
      bedrooms: 4,
      bathrooms: 2,
      yearBuilt: 2017,
      image: '/images/Elegant%20Brick%20House.jpg',
      features: ['Historic Charm', 'Brick Facade', 'Updated Kitchen', 'Private Yard'],
      description: 'Classic brick house with modern updates and timeless appeal.'
    },
    {
      id: 7,
      name: 'Suburban Family Home',
      location: 'Austin, TX',
      price: 380000,
      type: 'House',
      area: 2400,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2019,
      image: '/images/Suburban%20Family%20Home.jpg',
      features: ['Large Backyard', 'Two-Car Garage', 'Open Floor Plan', 'Master Suite'],
      description: 'Perfect family home in quiet suburban neighborhood.'
    },
    {
      id: 8,
      name: 'Waterfront Property',
      location: 'Seattle, WA',
      price: 650000,
      type: 'House',
      area: 3000,
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2020,
      image: '/images/Waterfront%20Property.jpg',
      features: ['Waterfront Access', 'Private Dock', 'Panoramic Views', 'Luxury Finishes'],
      description: 'Stunning waterfront home with private dock and amazing views.'
    },
    {
      id: 9,
      name: 'Large Land Plot',
      location: 'Texas',
      price: 90000,
      type: 'Land',
      area: 5000,
      bedrooms: 0,
      bathrooms: 0,
      yearBuilt: null,
      image: '/images/land1.jpg',
      features: ['Development Ready', 'Utilities Available', 'Prime Location', 'Investment Opportunity'],
      description: 'Prime development land with excellent investment potential.'
    }
  ];

  const addProperty = (property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const removeProperty = (propertyId) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  const resetComparison = () => {
    setSelectedProperties([]);
  };

  const shareComparison = () => {
    const propertyNames = selectedProperties.map(p => p.name).join(', ');
    if (navigator.share) {
      navigator.share({
        title: 'Property Comparison',
        text: `Compare these properties: ${propertyNames}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Compare these properties: ${propertyNames} - ${window.location.href}`);
      alert('Comparison link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <ScaleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Properties
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Easily compare different properties side by side to help you make the best decision for your next home or investment.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Selection Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Properties to Compare (up to 3)
              </h2>
              <p className="text-gray-600">
                Choose from your favorites or browse our listings to add properties to your comparison.
              </p>
            </div>
            {selectedProperties.length > 0 && (
              <div className="flex space-x-3">
                <button
                  onClick={resetComparison}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  <span>Reset Comparison</span>
                </button>
                <button
                  onClick={shareComparison}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share Comparison</span>
                </button>
              </div>
            )}
          </div>

          {/* Available Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableProperties.map((property) => {
              const isSelected = selectedProperties.find(p => p.id === property.id);
              const canAdd = selectedProperties.length < 3;
              
              return (
                <div
                  key={property.id}
                  className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/images/house.jpg.png';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      {isSelected ? (
                        <button
                          onClick={() => removeProperty(property.id)}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => canAdd && addProperty(property)}
                          disabled={!canAdd}
                          className={`p-2 rounded-full transition-colors ${
                            canAdd 
                              ? 'bg-white bg-opacity-90 text-gray-600 hover:bg-white hover:text-blue-600' 
                              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold text-blue-600">
                        ${property.price.toLocaleString()}
                      </div>
                    </div>

                    {property.bedrooms > 0 && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{property.bedrooms} beds</span>
                        <span>{property.bathrooms} baths</span>
                        <span>{property.area} sqft</span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedProperties.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Property Details</h2>
              <p className="text-blue-100">Compare selected properties side by side</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">Property Details</th>
                    {selectedProperties.map((property, index) => (
                      <th key={property.id} className="text-center p-4 font-semibold text-gray-900 min-w-[250px]">
                        Property {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Images */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-900">Image</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                          onError={(e) => {
                            e.target.src = '/images/house.jpg.png';
                          }}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Property Name */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Property Name</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        <span className="font-semibold text-blue-600">{property.name}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-900">Location</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.location}
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Price</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        <span className="text-xl font-bold text-green-600">
                          ${property.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Property Type */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-900">Property Type</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.type}
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Area</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.area} sq ft
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-900">Bedrooms</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.bedrooms || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Bathrooms</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.bathrooms || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Year Built */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-900">Year Built</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center text-gray-600">
                        {property.yearBuilt || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Features</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4">
                        <div className="space-y-1">
                          {property.features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-center space-x-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr className="bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Actions</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center space-y-2">
                        <div className="flex flex-col space-y-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            <span className="flex items-center justify-center space-x-1">
                              <HomeIcon className="h-4 w-4" />
                              <span>View</span>
                            </span>
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            <span className="flex items-center justify-center space-x-1">
                              <HeartIcon className="h-4 w-4" />
                              <span>Save</span>
                            </span>
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedProperties.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ScaleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Properties Selected</h3>
            <p className="text-gray-600">Select up to 3 properties above to start comparing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyComparison;
