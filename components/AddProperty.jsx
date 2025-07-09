import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import {  
  PhotoIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  TagIcon, 
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  RectangleGroupIcon,
  GlobeAltIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    imageUrl: '',
    propertyType: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: [],
    virtualTourUrl: '',
    mapUrl: '',
    nearbyAttractions: '',
    additionalImages: ['', '', '', ''],
    features: {
      parking: false,
      garden: false,
      pool: false,
      gym: false,
      security: false,
      furnished: false,
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('features.')) {
      const featureName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureName]: checked
        }
      }));
    } else if (name.startsWith('additionalImages')) {
      const index = parseInt(name.split('[')[1].split(']')[0]);
      setFormData(prev => ({
        ...prev,
        additionalImages: prev.additionalImages.map((img, i) => 
          i === index ? value : img
        )
      }));
    } else if (name === 'amenities') {
      const amenitiesArray = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        amenities: amenitiesArray
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.price || !formData.location || !formData.imageUrl) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (!formData.virtualTourUrl || !formData.mapUrl) {
      setError('Please provide virtual tour and map links');
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area: parseFloat(formData.area) || 0,
        additionalImages: formData.additionalImages.filter(img => img.trim() !== ''),
      };

      await propertyAPI.create(dataToSend);
      
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <HomeIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Create Premium Property Listing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcase your exceptional property with comprehensive details, stunning images, virtual tours, and interactive maps to attract the perfect buyers and renters
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <VideoCameraIcon className="w-4 h-4" />
              <span>Virtual Tours</span>
            </div>
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="w-4 h-4" />
              <span>Interactive Maps</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhotoIcon className="w-4 h-4" />
              <span>Multiple Images</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Comprehensive Property Details</h2>
            <p className="text-blue-100 mt-2">Create a detailed, engaging listing with all the information buyers and renters need</p>
          </div>
          <div className="p-8">
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
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Type */}
              <div className="space-y-2">
                <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-800">
                  Property Type
                </label>
                <div className="relative group">
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-gray-400"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                  <BuildingOfficeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Property Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                  Property Title *
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-400"
                    placeholder="Beautiful 3-bedroom house in downtown..."
                    required
                  />
                  <TagIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-800">
                  Location *
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-400"
                    placeholder="e.g. New York, USA"
                    required
                  />
                  <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-800">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="3"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-800">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="2"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="area" className="block text-sm font-semibold text-gray-800">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="1500"
                    min="0"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                  Property Description *
                </label>
                <div className="relative group">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none group-hover:border-gray-400"
                    placeholder="Provide a detailed description of your property, including unique features, room dimensions, recent renovations, and what makes it special..."
                    required
                  />
                  <DocumentTextIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <label htmlFor="amenities" className="block text-sm font-semibold text-gray-800">
                  Amenities (comma-separated)
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities.join(', ')}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-400"
                    placeholder="Air conditioning, Hardwood floors, Walk-in closet, Granite countertops"
                  />
                  <SparklesIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Property Features */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Property Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'parking', label: 'Parking Available' },
                    { key: 'garden', label: 'Garden/Yard' },
                    { key: 'pool', label: 'Swimming Pool' },
                    { key: 'gym', label: 'Gym/Fitness Center' },
                    { key: 'security', label: '24/7 Security' },
                    { key: 'furnished', label: 'Fully Furnished' },
                  ].map(feature => (
                    <div key={feature.key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        id={`features.${feature.key}`}
                        name={`features.${feature.key}`}
                        checked={formData.features[feature.key]}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`features.${feature.key}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                        {feature.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="space-y-2">
                <label htmlFor="nearbyAttractions" className="block text-sm font-semibold text-gray-800">
                  Nearby Attractions & Points of Interest
                </label>
                <div className="relative group">
                  <textarea
                    id="nearbyAttractions"
                    name="nearbyAttractions"
                    value={formData.nearbyAttractions}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none group-hover:border-gray-400"
                    placeholder="Schools: ABC Elementary (0.5 mi), XYZ High School (1.2 mi)&#10;Shopping: Downtown Mall (2 mi), Grocery Store (0.3 mi)&#10;Transportation: Metro Station (0.8 mi), Bus Stop (0.1 mi)&#10;Recreation: Central Park (1 mi), Community Center (0.7 mi)"
                  />
                  <RectangleGroupIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>
              
              {/* Price */}
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-semibold text-gray-800">
                  Price (USD) *
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-400"
                    placeholder="250,000"
                    min="0"
                    step="0.01"
                    required
                  />
                  <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Virtual Tour URL */}
              <div className="space-y-2">
                <label htmlFor="virtualTourUrl" className="block text-sm font-semibold text-gray-800">
                  Virtual Tour URL * (360° Video Link)
                </label>
                <div className="relative group">
                  <select
                    id="virtualTourUrl"
                    name="virtualTourUrl"
                    value={formData.virtualTourUrl}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-gray-400"
                    required
                  >
                    <option value="">Select a virtual tour</option>
                    <option value="https://www.youtube.com/watch?v=wGsEdAYNe0w">Luxury Modern Home Tour</option>
                    <option value="https://www.youtube.com/watch?v=evJs05fQpgE">Downtown Apartment Walkthrough</option>
                    <option value="https://www.youtube.com/watch?v=B4o8PvcqHC4">Suburban Family House Tour</option>
                    <option value="https://www.youtube.com/watch?v=_6Tu2UyvcWs">Penthouse Virtual Experience</option>
                    <option value="https://www.youtube.com/watch?v=cuf2UQ1fF6U">Waterfront Property Tour</option>
                  </select>
                  <VideoCameraIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Map URL */}
              <div className="space-y-2">
                <label htmlFor="mapUrl" className="block text-sm font-semibold text-gray-800">
                  Map Location URL * (Google Maps Link)
                </label>
                <div className="relative group">
                  <select
                    id="mapUrl"
                    name="mapUrl"
                    value={formData.mapUrl}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-gray-400"
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9">Downtown Manhattan Location</option>
                    <option value="https://maps.app.goo.gl/dp4E1fgXNV9tccvK7">Brooklyn Heights Area</option>
                    <option value="https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8">Queens Residential District</option>
                    <option value="https://maps.app.goo.gl/vSL2kBrvo4wxWMF16">Upper East Side Location</option>
                    <option value="https://maps.app.goo.gl/q26r2F9GG84EDnEP7">Westchester County Area</option>
                  </select>
                  <GlobeAltIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>
              
              {/* Main Image URL */}
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-800">
                  Main Property Image *
                </label>
                <div className="relative group">
                  <select
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-gray-400"
                    required
                  >
                    <option value="">Select main property image</option>
                    <option value="./images/Luxury Penthouse.jpg">Luxury Penthouse</option>
                    <option value="./images/modernfamilyhouse.jpg">Modern Family House</option>
                    <option value="./images/Downtown Apartment.jpg">Downtown Apartment</option>
                    <option value="./images/Suburban Family Home.jpg">Suburban Family Home</option>
                    <option value="./images/Waterfront Property.jpg">Waterfront Property</option>
                    <option value="./images/Elegant Brick House.jpg">Elegant Brick House</option>
                    <option value="./images/Cozy Studio Apartment.jpg">Cozy Studio Apartment</option>
                    <option value="./images/apartment1.jpg">Apartment 1</option>
                    <option value="./images/apartment2.jpg">Apartment 2</option>
                    <option value="./images/house4.jpg">House 4</option>
                    <option value="./images/house5.jpg">House 5</option>
                    <option value="./images/Mountain View Land.jpg">Mountain View Land</option>
                    <option value="./images/land1.jpg">Land Property</option>
                  </select>
                  <PhotoIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Additional Property Images (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.additionalImages.map((img, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600">
                        Image {index + 1}
                      </label>
                      <select
                        name={`additionalImages[${index}]`}
                        value={img}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                      >
                        <option value="">Select additional image</option>
                        <option value="./images/house1.jpg.png">House 1</option>
                        <option value="./images/house2.jpg.png">House 2</option>
                        <option value="./images/house3.jpg.png">House 3</option>
                        <option value="./images/apartment1.jpg">Apartment Interior</option>
                        <option value="./images/apartment2.jpg">Apartment Living Room</option>
                        <option value="./images/house4.jpg">House Garden View</option>
                        <option value="./images/house5.jpg">House Kitchen</option>
                        <option value="./images/virtual-tour-hero.jpg">Virtual Tour Preview</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Main Image Preview
                  </label>
                  <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 group">
                    <img
                      src={formData.imageUrl}
                      alt="Property preview"
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">Main Property Image</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Images Preview */}
              {formData.additionalImages.some(img => img) && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Additional Images Preview
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.additionalImages.map((img, index) => 
                      img && (
                        <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200 group">
                          <img
                            src={img}
                            alt={`Additional property image ${index + 1}`}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 text-white">
                            <p className="text-xs font-medium">Image {index + 1}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating Property Listing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <HomeIcon className="w-5 h-5" />
                      <span>Create Property Listing</span>
                    </div>
                  )}
                </button>
                <button 
                  type="button" 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] border border-gray-300"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
