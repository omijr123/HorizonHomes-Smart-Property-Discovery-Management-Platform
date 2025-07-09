import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Newsletter from './Newsletter';
import { AnimatedSection, ScrollProgress, ScrollToTop } from '../utils/animations';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  CalculatorIcon,
  EyeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  StarIcon,
  VideoCameraIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    propertyType: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });
  
  const [showAllProperties, setShowAllProperties] = useState(false);

  // Enhanced property data with local images and comprehensive details
  const allProperties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      price: 1200000,
      type: "sale",
      location: "Manhattan, NY",
      image: "/images/Luxury Penthouse.jpg",
      images: [
        "/images/Luxury Penthouse.jpg",
        "/images/apartment1.jpg",
        "/images/apartment2.jpg",
        "/images/house1.jpg.png"
      ],
      beds: 3,
      baths: 2,
      sqft: 1800,
      featured: true,
      tag: "Featured",
      tagColor: "blue",
      description: "Stunning penthouse with panoramic city views, modern amenities, and premium finishes throughout. Features floor-to-ceiling windows, gourmet kitchen with top-of-the-line appliances, and a private terrace perfect for entertaining.",
      virtualTour: "https://www.youtube.com/watch?v=wGsEdAYNe0w",
      mapLink: "https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9",
      amenities: ["City Views", "Modern Kitchen", "Marble Floors", "Rooftop Access", "Concierge Service", "Fitness Center"],
      features: ["Smart Home Technology", "High-end Appliances", "Hardwood Floors", "In-unit Laundry", "Central Air/Heat", "Private Terrace"],
      roomDimensions: {
        "Living Room": "20' x 25'",
        "Master Bedroom": "15' x 18'",
        "Kitchen": "12' x 15'"
      }
    },
    {
      id: 2,
      title: "Modern Family House",
      price: 850000,
      type: "sale",
      location: "Beverly Hills, CA",
      image: "/images/modernfamilyhouse.jpg",
      images: [
        "/images/modernfamilyhouse.jpg",
        "/images/house2.jpg.png",
        "/images/house3.jpg.png",
        "/images/house4.jpg"
      ],
      beds: 4,
      baths: 3,
      sqft: 2500,
      featured: true,
      tag: "Featured",
      tagColor: "blue",
      description: "Contemporary family home with spacious living areas, gourmet kitchen, and beautiful landscaping. Open floor plan with high ceilings and premium finishes throughout.",
      virtualTour: "https://www.youtube.com/watch?v=evJs05fQpgE",
      mapLink: "https://maps.app.goo.gl/dp4E1fgXNV9tccvK7",
      amenities: ["Swimming Pool", "Garage", "Garden", "Modern Design", "Security System", "Walk-in Closets"],
      features: ["Swimming Pool", "2-Car Garage", "Landscaped Garden", "Security System", "Central Air/Heat", "Walk-in Closets"],
      roomDimensions: {
        "Living Room": "22' x 28'",
        "Master Bedroom": "16' x 20'",
        "Kitchen": "14' x 18'"
      }
    },
    {
      id: 3,
      title: "Downtown Apartment",
      price: 4500,
      type: "rent",
      location: "Austin, TX",
      image: "/images/Downtown Apartment.jpg",
      images: [
        "/images/Downtown Apartment.jpg",
        "/images/apartment1.jpg",
        "/images/apartment2.jpg",
        "/images/house5.jpg"
      ],
      beds: 2,
      baths: 2,
      sqft: 1200,
      featured: false,
      tag: "For Rent",
      tagColor: "blue",
      description: "Stylish downtown apartment with urban convenience and modern amenities in the heart of the city. Floor-to-ceiling windows with stunning city views.",
      virtualTour: "https://www.youtube.com/watch?v=B4o8PvcqHC4",
      mapLink: "https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8",
      amenities: ["Downtown Location", "Modern Appliances", "Fitness Center", "Balcony", "Rooftop Deck", "Concierge"],
      features: ["City Views", "Modern Appliances", "Balcony", "In-unit Laundry", "Hardwood Floors", "Central AC"],
      roomDimensions: {
        "Living Room": "18' x 22'",
        "Master Bedroom": "14' x 16'",
        "Kitchen": "10' x 12'"
      }
    },
    {
      id: 4,
      title: "Suburban Family Home",
      price: 650000,
      type: "sale",
      location: "Westchester, NY",
      image: "/images/Suburban Family Home.jpg",
      images: [
        "/images/Suburban Family Home.jpg",
        "/images/house1.jpg.png",
        "/images/house2.jpg.png",
        "/images/house3.jpg.png"
      ],
      beds: 5,
      baths: 4,
      sqft: 3200,
      featured: false,
      tag: "New",
      tagColor: "green",
      description: "Spacious family home in quiet neighborhood with large yard, perfect for families with children. Recently updated kitchen and bathrooms.",
      virtualTour: "https://www.youtube.com/watch?v=_6Tu2UyvcWs",
      mapLink: "https://maps.app.goo.gl/vSL2kBrvo4wxWMF16",
      amenities: ["Large Yard", "2-Car Garage", "Quiet Neighborhood", "Updated Kitchen", "Finished Basement", "Deck"],
      features: ["Large Yard", "2-Car Garage", "Updated Kitchen", "Finished Basement", "Hardwood Floors", "Central AC"],
      roomDimensions: {
        "Living Room": "20' x 24'",
        "Master Bedroom": "16' x 18'",
        "Kitchen": "12' x 16'"
      }
    },
    {
      id: 5,
      title: "Waterfront Property",
      price: 1500000,
      type: "sale",
      location: "Miami Beach, FL",
      image: "/images/Waterfront Property.jpg",
      images: [
        "/images/Waterfront Property.jpg",
        "/images/house4.jpg",
        "/images/house5.jpg",
        "/images/apartment1.jpg"
      ],
      beds: 4,
      baths: 3,
      sqft: 2800,
      featured: true,
      tag: "Luxury",
      tagColor: "purple",
      description: "Exclusive waterfront property with private beach access and stunning ocean views. Premium finishes and luxury amenities throughout.",
      virtualTour: "https://www.youtube.com/watch?v=cuf2UQ1fF6U",
      mapLink: "https://maps.app.goo.gl/q26r2F9GG84EDnEP7",
      amenities: ["Ocean Views", "Private Beach", "Boat Dock", "Luxury Finishes", "Pool", "Spa"],
      features: ["Ocean Views", "Private Beach", "Boat Dock", "Swimming Pool", "Luxury Finishes", "Smart Home"],
      roomDimensions: {
        "Living Room": "24' x 30'",
        "Master Bedroom": "18' x 22'",
        "Kitchen": "16' x 20'"
      }
    },
    {
      id: 6,
      title: "Elegant Brick House",
      price: 750000,
      type: "sale",
      location: "Chicago, IL",
      image: "/images/Elegant Brick House.jpg",
      images: [
        "/images/Elegant Brick House.jpg",
        "/images/house2.jpg.png",
        "/images/house3.jpg.png",
        "/images/house1.jpg.png"
      ],
      beds: 3,
      baths: 2,
      sqft: 2000,
      featured: false,
      tag: "Updated",
      tagColor: "orange",
      description: "Classic brick house with modern updates, hardwood floors, and charming architectural details. Recently renovated with preserved historic character.",
      virtualTour: "https://www.youtube.com/watch?v=wGsEdAYNe0w",
      mapLink: "https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9",
      amenities: ["Hardwood Floors", "Updated Kitchen", "Historic Charm", "Large Windows", "Fireplace", "Garden"],
      features: ["Hardwood Floors", "Updated Kitchen", "Historic Details", "Large Windows", "Fireplace", "Private Garden"],
      roomDimensions: {
        "Living Room": "18' x 20'",
        "Master Bedroom": "14' x 16'",
        "Kitchen": "10' x 14'"
      }
    },
    {
      id: 7,
      title: "Cozy Studio Apartment",
      price: 2800,
      type: "rent",
      location: "Brooklyn, NY",
      image: "/images/Cozy Studio Apartment.jpg",
      images: [
        "/images/Cozy Studio Apartment.jpg",
        "/images/apartment1.jpg",
        "/images/apartment2.jpg",
        "/images/house5.jpg"
      ],
      beds: 1,
      baths: 1,
      sqft: 600,
      featured: false,
      tag: "Affordable",
      tagColor: "green",
      description: "Charming studio apartment with high ceilings, exposed brick, and modern amenities. Perfect for young professionals.",
      virtualTour: "https://www.youtube.com/watch?v=evJs05fQpgE",
      mapLink: "https://maps.app.goo.gl/dp4E1fgXNV9tccvK7",
      amenities: ["High Ceilings", "Exposed Brick", "Modern Bath", "Great Location", "Natural Light", "Storage"],
      features: ["High Ceilings", "Exposed Brick", "Modern Appliances", "Hardwood Floors", "Large Windows", "Efficient Layout"],
      roomDimensions: {
        "Studio": "18' x 22'",
        "Kitchen": "8' x 10'",
        "Bathroom": "6' x 8'"
      }
    },
    {
      id: 8,
      title: "Mountain View Land",
      price: 250000,
      type: "sale",
      location: "Denver, CO",
      image: "/images/Mountain View Land.jpg",
      images: [
        "/images/Mountain View Land.jpg",
        "/images/land1.jpg",
        "/images/house4.jpg",
        "/images/house5.jpg"
      ],
      beds: 0,
      baths: 0,
      sqft: 5000,
      featured: false,
      tag: "Land",
      tagColor: "brown",
      description: "Prime building lot with spectacular mountain views and utilities ready for your dream home. Perfect location for custom home construction.",
      virtualTour: "https://www.youtube.com/watch?v=B4o8PvcqHC4",
      mapLink: "https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8",
      amenities: ["Mountain Views", "Utilities Ready", "Prime Location", "Build Ready", "Surveyed", "Cleared"],
      features: ["Mountain Views", "Utilities Available", "Prime Location", "Build Ready", "5000 sq ft lot", "Surveyed"],
      roomDimensions: {
        "Lot Size": "5000 sq ft",
        "Frontage": "100 ft",
        "Depth": "50 ft"
      }
    },
    {
      id: 9,
      title: "Modern Apartment Complex",
      price: 3200,
      type: "rent",
      location: "Seattle, WA",
      image: "/images/apartment1.jpg",
      images: [
        "/images/apartment1.jpg",
        "/images/apartment2.jpg",
        "/images/Downtown Apartment.jpg",
        "/images/house5.jpg"
      ],
      beds: 2,
      baths: 2,
      sqft: 1100,
      featured: false,
      tag: "Modern",
      tagColor: "blue",
      description: "Contemporary apartment with state-of-the-art amenities and stunning city views. Brand new construction with luxury finishes.",
      virtualTour: "https://www.youtube.com/watch?v=_6Tu2UyvcWs",
      mapLink: "https://maps.app.goo.gl/vSL2kBrvo4wxWMF16",
      amenities: ["City Views", "Gym Access", "Rooftop Deck", "In-Unit Laundry", "Concierge", "Pet Friendly"],
      features: ["City Views", "Modern Appliances", "Rooftop Access", "In-Unit Laundry", "Central AC", "Balcony"],
      roomDimensions: {
        "Living Room": "16' x 18'",
        "Master Bedroom": "12' x 14'",
        "Kitchen": "8' x 12'"
      }
    }
  ];

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search data:', searchData);
  };

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen">
        {/* Hero Section with Video Background */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Find Your Dream Home
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                    Discover premium properties with Horizon Homes - Your trusted property partner
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                      to="/properties"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                    >
                      View Properties
                    </Link>
                    <button className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm">
                      Virtual Tours
                    </button>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Right Content - Search Form */}
              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Find Your Perfect Home
              </h2>
              <form onSubmit={handleSearchSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="propertyType"
                      value={searchData.propertyType}
                      onChange={handleSearchChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    >
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="condo">Condo</option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="location"
                      value={searchData.location}
                      onChange={handleSearchChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    >
                      <option value="">Location</option>
                      <option value="new-york">New York</option>
                      <option value="california">California</option>
                      <option value="texas">Texas</option>
                      <option value="florida">Florida</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="minPrice"
                    value={searchData.minPrice}
                    onChange={handleSearchChange}
                    placeholder="Min Price"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={searchData.maxPrice}
                    onChange={handleSearchChange}
                    placeholder="Max Price"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search Properties</span>
                </button>
              </form>
            </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium homes with comprehensive details and virtual tours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(showAllProperties ? allProperties : allProperties.slice(0, 6)).map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${
                      property.tagColor === 'blue' ? 'bg-blue-600' :
                      property.tagColor === 'green' ? 'bg-green-600' :
                      property.tagColor === 'purple' ? 'bg-purple-600' :
                      property.tagColor === 'orange' ? 'bg-orange-600' :
                      property.tagColor === 'brown' ? 'bg-amber-600' :
                      'bg-blue-600'
                    } text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {property.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full font-bold">
                    ${property.type === 'rent' ? `${property.price.toLocaleString()}/month` : property.price.toLocaleString()}
                  </div>
                  
                  {/* Virtual Tour and Map Icons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <a
                      href={property.virtualTour}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                      title="Virtual Tour"
                    >
                      <VideoCameraIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={property.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                      title="View on Map"
                    >
                      <GlobeAltIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  
                  {/* Property Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {property.beds > 0 && (
                      <span className="flex items-center">
                        <HomeIcon className="h-4 w-4 mr-1" />
                        {property.beds} Beds
                      </span>
                    )}
                    {property.baths > 0 && <span>{property.baths} Baths</span>}
                    <span>{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 2).map((amenity, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{property.amenities.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => navigate(`/property/${property.id}`)}
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                      View Details
                    </button>
                    <a
                      href={property.virtualTour}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-colors duration-200"
                      title="Virtual Tour"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            {!showAllProperties ? (
              <button
                onClick={() => setShowAllProperties(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
              >
                <span>Load More Properties</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setShowAllProperties(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2 mr-4"
                >
                  <span>Show Less</span>
                </button>
                <Link
                  to="/properties"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
                >
                  <span>View All Properties</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" animation="fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive property solutions
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Property Sales */}
            <AnimatedSection animation="fadeInUp" delay={100} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HomeIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Sales</h3>
              <p className="text-gray-600 text-center">
                Expert guidance through the entire buying and selling process with market insights and negotiation support.
              </p>
            </AnimatedSection>

            {/* Property Rental */}
            <AnimatedSection animation="fadeInUp" delay={200} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MagnifyingGlassIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Rental</h3>
              <p className="text-gray-600 text-center">
                Find the perfect rental property or manage your investment properties with our comprehensive rental services.
              </p>
            </AnimatedSection>

            {/* Mortgage Assistance */}
            <AnimatedSection animation="fadeInUp" delay={300} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CalculatorIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mortgage Assistance</h3>
              <p className="text-gray-600 text-center">
                Get pre-approved and find the best mortgage rates with our trusted lending partners and financial advisors.
              </p>
            </AnimatedSection>

            {/* Virtual Tours */}
            <AnimatedSection animation="fadeInUp" delay={400} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <EyeIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual Tours</h3>
              <p className="text-gray-600 text-center">
                Experience properties from anywhere with our immersive 3D virtual tours and high-quality photography.
              </p>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="fadeInUp" delay={500} className="text-center mt-12">
            <Link 
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              View All Services
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl">Properties Sold</div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl">Happy Clients</div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-xl">Years Experience</div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Expert Agents</div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" animation="fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <AnimatedSection animation="fadeInUp" delay={100} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Horizon Homes made our home buying experience seamless and stress-free. Their team was professional and knowledgeable."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt="John Smith"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">John Smith</div>
                  <div className="text-gray-600">Home Buyer</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Testimonial 2 */}
            <AnimatedSection animation="fadeInUp" delay={200} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The virtual tours were amazing! We could view multiple properties without leaving our home. Highly recommended!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600">Property Investor</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Testimonial 3 */}
            <AnimatedSection animation="fadeInUp" delay={300} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Excellent service from start to finish. They helped us find our dream home within our budget and timeline."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Mike Davis"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Mike Davis</div>
                  <div className="text-gray-600">First-time Buyer</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter variant="inline" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Horizon Homes</h3>
              <p className="text-gray-400 mb-6">
                Your trusted partner in finding the perfect home. We provide comprehensive property services with a commitment to excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
                <li><Link to="/neighborhoods" className="text-gray-400 hover:text-white transition-colors">Neighborhoods</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">All Services</Link></li>
                <li><Link to="/services#buying" className="text-gray-400 hover:text-white transition-colors">Buy Property</Link></li>
                <li><Link to="/services#selling" className="text-gray-400 hover:text-white transition-colors">Sell Property</Link></li>
                <li><Link to="/services#renting" className="text-gray-400 hover:text-white transition-colors">Rent Property</Link></li>
                <li><Link to="/services#investment" className="text-gray-400 hover:text-white transition-colors">Investment Advisory</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@horizonhomes.com
                </div>
                <div className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    123 Horizon Homes Ave,<br />
                    City, State 12345
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
            <p>&copy; 2025 Horizon Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </>
  );
};

export default Home;
