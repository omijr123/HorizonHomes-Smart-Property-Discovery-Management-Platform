import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  StarIcon,
  CheckIcon,
  XMarkIcon,
  PlayIcon,
  EyeIcon,
  CameraIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import AnimatedSection from '../utils/animations';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced property data (same as Home component but with more details)
  const allProperties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      price: 1200000,
      type: "sale",
      location: "Manhattan, NY",
      fullAddress: "123 Park Avenue, Manhattan, NY 10016",
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
      yearBuilt: 2020,
      lotSize: "N/A",
      parkingSpaces: 2,
      featured: true,
      tag: "Featured",
      tagColor: "blue",
      description: "Stunning penthouse with panoramic city views, modern amenities, and premium finishes throughout. This luxury residence features floor-to-ceiling windows, a gourmet kitchen with top-of-the-line appliances, and a private terrace perfect for entertaining.",
      virtualTour: "https://www.youtube.com/watch?v=4jnzf1yj48M",
      mapLink: "https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9",
      amenities: ["Panoramic City Views", "Gourmet Kitchen", "Italian Marble Floors", "Private Rooftop Terrace", "24/7 Concierge Service", "State-of-the-Art Fitness Center", "Private Elevator Access", "Wine Storage", "Spa Bathroom", "Smart Climate Control"],
      roomDimensions: {
        "Living Room": "20' x 25'",
        "Master Bedroom": "15' x 18'",
        "Kitchen": "12' x 15'",
        "Dining Room": "14' x 16'",
        "Home Office": "10' x 12'",
        "Walk-in Closet": "8' x 10'"
      },
      nearbyAttractions: [
        "Central Park - 0.3 miles",
        "Times Square - 0.8 miles",
        "Grand Central Station - 0.5 miles",
        "Bryant Park - 0.2 miles",
        "Lincoln Center - 1.2 miles",
        "High Line Park - 1.5 miles"
      ],
      features: [
        "Smart Home Automation System",
        "Premium Sub-Zero Appliances",
        "Brazilian Hardwood Floors",
        "In-unit Washer/Dryer",
        "Zoned Climate Control",
        "Private Outdoor Terrace",
        "Floor-to-ceiling Windows",
        "Custom Built-ins",
        "High-speed Internet Ready",
        "EV Charging Station"
      ],
      agent: {
        name: "Sarah Johnson",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@horizonhomes.com",
        image: "/images/agent1.jpg"
      }
    },
    {
      id: 2,
      title: "Modern Family House",
      price: 850000,
      type: "sale",
      location: "Beverly Hills, CA",
      fullAddress: "456 Sunset Boulevard, Beverly Hills, CA 90210",
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
      yearBuilt: 2019,
      lotSize: "0.3 acres",
      parkingSpaces: 2,
      featured: true,
      tag: "Featured",
      tagColor: "blue",
      description: "Contemporary family home with spacious living areas, gourmet kitchen, and beautiful landscaping. This stunning property features an open floor plan, high ceilings, and premium finishes throughout.",
      virtualTour: "https://www.youtube.com/watch?v=otYbvFPA5MI",
      mapLink: "https://maps.app.goo.gl/dp4E1fgXNV9tccvK7",
      amenities: ["Resort-Style Swimming Pool", "Smart Pool Controls", "Zen Garden & Meditation Area", "Contemporary Architecture", "Advanced Security System", "Designer Walk-in Closets", "Outdoor Kitchen", "Fire Pit Lounge", "Tesla Charging Station", "Home Theater System"],
      roomDimensions: {
        "Living Room": "22' x 28'",
        "Master Bedroom": "16' x 20'",
        "Kitchen": "14' x 18'",
        "Family Room": "18' x 22'",
        "Home Office": "12' x 14'",
        "Guest Suite": "14' x 16'"
      },
      nearbyAttractions: [
        "Rodeo Drive - 1.2 miles",
        "Beverly Hills Hotel - 0.8 miles",
        "Century City Mall - 2.1 miles",
        "UCLA - 3.5 miles",
        "Sunset Strip - 2.3 miles",
        "Getty Center - 4.1 miles"
      ],
      features: [
        "Infinity Edge Swimming Pool",
        "Attached 2-Car Garage",
        "Professional Landscaping",
        "Smart Security System",
        "Radiant Floor Heating",
        "Custom Walk-in Closets",
        "Home Automation System",
        "Solar Panel System",
        "Outdoor Entertainment Area",
        "Wine Cellar"
      ],
      agent: {
        name: "Michael Chen",
        phone: "+1 (555) 234-5678",
        email: "michael.chen@horizonhomes.com",
        image: "/images/agent2.jpg"
      }
    },
    {
      id: 3,
      title: "Downtown Apartment",
      price: 4500,
      type: "rent",
      location: "Austin, TX",
      fullAddress: "789 Congress Avenue, Austin, TX 78701",
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
      yearBuilt: 2021,
      lotSize: "N/A",
      parkingSpaces: 1,
      featured: false,
      tag: "For Rent",
      tagColor: "blue",
      description: "Stylish downtown apartment with urban convenience and modern amenities in the heart of the city. Features include floor-to-ceiling windows, stainless steel appliances, and access to building amenities.",
      virtualTour: "https://www.youtube.com/watch?v=1Dj8cpZN-AU",
      mapLink: "https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8",
      amenities: ["Downtown Location", "Modern Appliances", "Fitness Center", "Balcony", "Rooftop Pool", "Concierge"],
      roomDimensions: {
        "Living Room": "16' x 20'",
        "Master Bedroom": "12' x 14'",
        "Kitchen": "10' x 12'",
        "Second Bedroom": "11' x 13'"
      },
      nearbyAttractions: [
        "State Capitol - 0.5 miles",
        "6th Street - 0.3 miles",
        "Lady Bird Lake - 0.7 miles",
        "Austin Convention Center - 0.4 miles"
      ],
      features: [
        "Balcony",
        "In-unit Laundry",
        "Stainless Appliances",
        "Hardwood Floors",
        "Central Air/Heat",
        "High Ceilings"
      ],
      agent: {
        name: "Emily Rodriguez",
        phone: "+1 (555) 345-6789",
        email: "emily.rodriguez@horizonhomes.com",
        image: "/images/agent3.jpg"
      }
    },
    {
      id: 4,
      title: "Suburban Family Home",
      price: 650000,
      type: "sale",
      location: "Westchester, NY",
      fullAddress: "456 Oak Street, Westchester, NY 10601",
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
      yearBuilt: 2018,
      lotSize: "0.5 acres",
      parkingSpaces: 2,
      featured: false,
      tag: "New",
      tagColor: "green",
      description: "Spacious family home in quiet neighborhood with large yard, perfect for families with children. Recently updated kitchen and bathrooms with modern fixtures and finishes.",
      virtualTour: "https://www.youtube.com/watch?v=7EHnQ0VM4KY",
      mapLink: "https://maps.app.goo.gl/vSL2kBrvo4wxWMF16",
      amenities: ["Large Yard", "2-Car Garage", "Quiet Neighborhood", "Updated Kitchen", "Finished Basement", "Deck"],
      roomDimensions: {
        "Living Room": "20' x 24'",
        "Master Bedroom": "16' x 18'",
        "Kitchen": "12' x 16'",
        "Family Room": "18' x 20'"
      },
      nearbyAttractions: [
        "Westchester Mall - 2.1 miles",
        "Cross County Shopping - 1.8 miles",
        "Saxon Woods Park - 1.2 miles",
        "Metro North Station - 0.8 miles"
      ],
      features: [
        "Large Yard",
        "2-Car Garage",
        "Updated Kitchen",
        "Finished Basement",
        "Hardwood Floors",
        "Central AC"
      ],
      agent: {
        name: "David Wilson",
        phone: "+1 (555) 456-7890",
        email: "david.wilson@horizonhomes.com",
        image: "/images/agent4.jpg"
      }
    },
    {
      id: 5,
      title: "Waterfront Property",
      price: 1500000,
      type: "sale",
      location: "Miami Beach, FL",
      fullAddress: "789 Ocean Drive, Miami Beach, FL 33139",
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
      yearBuilt: 2020,
      lotSize: "0.2 acres",
      parkingSpaces: 2,
      featured: true,
      tag: "Luxury",
      tagColor: "purple",
      description: "Exclusive waterfront property with private beach access and stunning ocean views. Premium finishes and luxury amenities throughout this coastal paradise.",
      virtualTour: "https://www.youtube.com/watch?v=hIe96oBIO5o",
      mapLink: "https://maps.app.goo.gl/q26r2F9GG84EDnEP7",
      amenities: ["Panoramic Ocean Views", "Private Beach Access", "Deep Water Boat Dock", "Italian Marble Finishes", "Infinity Pool", "Full-Service Spa", "Wine Cellar", "Home Theater", "Chef's Kitchen", "Butler's Pantry", "Elevator", "Hurricane Protection"],
      roomDimensions: {
        "Living Room": "24' x 30'",
        "Master Bedroom": "18' x 22'",
        "Kitchen": "16' x 20'",
        "Dining Room": "14' x 18'"
      },
      nearbyAttractions: [
        "South Beach - 0.5 miles",
        "Lincoln Road - 0.7 miles",
        "Art Deco District - 0.3 miles",
        "Miami Beach Marina - 0.2 miles"
      ],
      features: [
        "Ocean Views",
        "Private Beach",
        "Boat Dock",
        "Swimming Pool",
        "Luxury Finishes",
        "Smart Home"
      ],
      agent: {
        name: "Maria Santos",
        phone: "+1 (555) 567-8901",
        email: "maria.santos@horizonhomes.com",
        image: "/images/agent1.jpg"
      }
    },
    {
      id: 6,
      title: "Elegant Brick House",
      price: 750000,
      type: "sale",
      location: "Chicago, IL",
      fullAddress: "321 Lincoln Avenue, Chicago, IL 60614",
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
      yearBuilt: 1925,
      lotSize: "0.15 acres",
      parkingSpaces: 1,
      featured: false,
      tag: "Updated",
      tagColor: "orange",
      description: "Classic brick house with modern updates, hardwood floors, and charming architectural details. Recently renovated with preserved historic character and modern conveniences.",
      virtualTour: "https://www.youtube.com/watch?v=qKCqYr2qF2I",
      mapLink: "https://maps.app.goo.gl/Snp3Zq6toWUTtZgD9",
      amenities: ["Hardwood Floors", "Updated Kitchen", "Historic Charm", "Large Windows", "Fireplace", "Garden"],
      roomDimensions: {
        "Living Room": "18' x 20'",
        "Master Bedroom": "14' x 16'",
        "Kitchen": "10' x 14'",
        "Dining Room": "12' x 14'"
      },
      nearbyAttractions: [
        "Lincoln Park Zoo - 0.5 miles",
        "North Avenue Beach - 0.8 miles",
        "DePaul University - 0.3 miles",
        "Lincoln Park - 0.2 miles"
      ],
      features: [
        "Hardwood Floors",
        "Updated Kitchen",
        "Historic Details",
        "Large Windows",
        "Fireplace",
        "Private Garden"
      ],
      agent: {
        name: "Robert Thompson",
        phone: "+1 (555) 678-9012",
        email: "robert.thompson@horizonhomes.com",
        image: "/images/agent2.jpg"
      }
    },
    {
      id: 7,
      title: "Cozy Studio Apartment",
      price: 2800,
      type: "rent",
      location: "Brooklyn, NY",
      fullAddress: "456 Bedford Avenue, Brooklyn, NY 11249",
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
      yearBuilt: 2017,
      lotSize: "N/A",
      parkingSpaces: 0,
      featured: false,
      tag: "Affordable",
      tagColor: "green",
      description: "Charming studio apartment with high ceilings, exposed brick, and modern amenities. Perfect for young professionals in trendy Williamsburg neighborhood.",
      virtualTour: "https://www.youtube.com/watch?v=4jnzf1yj48M",
      mapLink: "https://maps.app.goo.gl/dp4E1fgXNV9tccvK7",
      amenities: ["High Ceilings", "Exposed Brick", "Modern Bath", "Great Location", "Natural Light", "Storage"],
      roomDimensions: {
        "Studio": "18' x 22'",
        "Kitchen": "8' x 10'",
        "Bathroom": "6' x 8'"
      },
      nearbyAttractions: [
        "East River State Park - 0.3 miles",
        "Brooklyn Brewery - 0.5 miles",
        "Williamsburg Bridge - 0.7 miles",
        "McCarren Park - 0.4 miles"
      ],
      features: [
        "High Ceilings",
        "Exposed Brick",
        "Modern Appliances",
        "Hardwood Floors",
        "Large Windows",
        "Efficient Layout"
      ],
      agent: {
        name: "Jessica Miller",
        phone: "+1 (555) 789-0123",
        email: "jessica.miller@horizonhomes.com",
        image: "/images/agent3.jpg"
      }
    },
    {
      id: 8,
      title: "Mountain View Land",
      price: 250000,
      type: "sale",
      location: "Denver, CO",
      fullAddress: "1234 Mountain Ridge Road, Denver, CO 80202",
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
      yearBuilt: null,
      lotSize: "1.2 acres",
      parkingSpaces: 0,
      featured: false,
      tag: "Land",
      tagColor: "brown",
      description: "Prime building lot with spectacular mountain views and utilities ready for your dream home. Perfect location for custom home construction with panoramic Rocky Mountain vistas.",
      virtualTour: "https://www.youtube.com/watch?v=otYbvFPA5MI",
      mapLink: "https://maps.app.goo.gl/GiEjNB9nqU6gCLLo8",
      amenities: ["Mountain Views", "Utilities Ready", "Prime Location", "Build Ready", "Surveyed", "Cleared"],
      roomDimensions: {
        "Lot Size": "5000 sq ft",
        "Frontage": "100 ft",
        "Depth": "50 ft"
      },
      nearbyAttractions: [
        "Rocky Mountain National Park - 25 miles",
        "Downtown Denver - 15 miles",
        "Denver International Airport - 20 miles",
        "Golden Gate Canyon State Park - 18 miles"
      ],
      features: [
        "Mountain Views",
        "Utilities Available",
        "Prime Location",
        "Build Ready",
        "5000 sq ft lot",
        "Surveyed"
      ],
      agent: {
        name: "Mark Anderson",
        phone: "+1 (555) 890-1234",
        email: "mark.anderson@horizonhomes.com",
        image: "/images/agent4.jpg"
      }
    },
    {
      id: 9,
      title: "Modern Apartment Complex",
      price: 3200,
      type: "rent",
      location: "Seattle, WA",
      fullAddress: "789 Pine Street, Seattle, WA 98101",
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
      yearBuilt: 2022,
      lotSize: "N/A",
      parkingSpaces: 1,
      featured: false,
      tag: "Modern",
      tagColor: "blue",
      description: "Contemporary apartment with state-of-the-art amenities and stunning city views. Brand new construction with luxury finishes and smart home technology.",
      virtualTour: "https://www.youtube.com/watch?v=1Dj8cpZN-AU",
      mapLink: "https://maps.app.goo.gl/vSL2kBrvo4wxWMF16",
      amenities: ["City Views", "Gym Access", "Rooftop Deck", "In-Unit Laundry", "Concierge", "Pet Friendly"],
      roomDimensions: {
        "Living Room": "16' x 18'",
        "Master Bedroom": "12' x 14'",
        "Kitchen": "8' x 12'",
        "Second Bedroom": "10' x 12'"
      },
      nearbyAttractions: [
        "Pike Place Market - 0.5 miles",
        "Space Needle - 1.2 miles",
        "Elliott Bay - 0.3 miles",
        "Seattle Art Museum - 0.4 miles"
      ],
      features: [
        "City Views",
        "Modern Appliances",
        "Rooftop Access",
        "In-Unit Laundry",
        "Central AC",
        "Balcony"
      ],
      agent: {
        name: "Lisa Chang",
        phone: "+1 (555) 901-2345",
        email: "lisa.chang@horizonhomes.com",
        image: "/images/agent1.jpg"
      }
    }
  ];

  const property = allProperties.find(p => p.id === parseInt(id));

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeVideoId(property?.virtualTour);

  useEffect(() => {
    if (!property) {
      navigate('/properties');
    }
  }, [property, navigate]);

  if (!property) {
    return null;
  }

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    setShowContactForm(false);
    alert('Your message has been sent to the agent!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Properties</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-600" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShareIcon className="h-6 w-6" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>{property.fullAddress}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${property.type === 'rent' ? `${property.price.toLocaleString()}/month` : property.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {property.type === 'rent' ? 'Monthly Rent' : 'Sale Price'}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-5 w-5 text-gray-400" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Built {property.yearBuilt}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`bg-${property.tagColor === 'blue' ? 'blue' : property.tagColor === 'green' ? 'green' : property.tagColor === 'purple' ? 'purple' : 'blue'}-600 text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {property.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setShowVirtualTour(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <VideoCameraIcon className="h-4 w-4" />
                    <span>Virtual Tour</span>
                  </button>
                  <a
                    href={property.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <GlobeAltIcon className="h-4 w-4" />
                    <span>View Map</span>
                  </a>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { id: 'overview', name: 'Overview', icon: HomeIcon },
                    { id: 'virtual-tour', name: 'Virtual Tour', icon: VideoCameraIcon },
                    { id: 'features', name: 'Features', icon: CheckIcon },
                    { id: 'location', name: 'Location', icon: MapPinIcon }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Room Dimensions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(property.roomDimensions).map(([room, dimension]) => (
                          <div key={room} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-900">{room}</span>
                            <span className="text-gray-600">{dimension}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'virtual-tour' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Tour</h2>
                    
                    {/* YouTube Video Embed */}
                    {videoId && (
                      <div className="relative overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                          title="Property Virtual Tour"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {/* Interactive Room Gallery */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Room Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {property.images.map((image, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
                            <img 
                              src={image} 
                              alt={`Room ${index + 1}`} 
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-center">
                                <EyeIcon className="h-8 w-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">View in Tour</p>
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                              Room {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Property Statistics */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Property Stats</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{property.beds}</div>
                          <div className="text-sm text-gray-600">Bedrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{property.baths}</div>
                          <div className="text-sm text-gray-600">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{property.sqft.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Sq Ft</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{property.yearBuilt}</div>
                          <div className="text-sm text-gray-600">Year Built</div>
                        </div>
                      </div>
                    </div>

                    {/* Virtual Tour Highlights */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                          <div className="space-y-2">
                            {property.features.slice(0, 5).map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Premium Amenities</h4>
                          <div className="space-y-2">
                            {property.amenities.slice(0, 5).map((amenity, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                <span className="text-sm text-gray-700">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tour Features */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                        <EyeIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900">360° Views</h4>
                        <p className="text-sm text-gray-600">Explore every corner</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                        <CameraIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900">HD Quality</h4>
                        <p className="text-sm text-gray-600">Crystal clear visuals</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                        <ClockIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900">Self-Guided</h4>
                        <p className="text-sm text-gray-600">Tour at your pace</p>
                      </div>
                    </div>

                    {/* Tour Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">How to Navigate the Tour</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Click and drag to look around each room</li>
                        <li>• Use on-screen arrows to move between rooms</li>
                        <li>• Click on hotspots for detailed information</li>
                        <li>• Use fullscreen for the best experience</li>
                      </ul>
                    </div>

                    {/* Alternative tour link */}
                    <div className="text-center">
                      <a
                        href={property.virtualTour}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                      >
                        <PlayIcon className="h-5 w-5" />
                        <span>Open Full Tour in New Window</span>
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckIcon className="h-5 w-5 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Amenities</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <CheckIcon className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Nearby</h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-700">{property.fullAddress}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Attractions</h3>
                      <div className="space-y-3">
                        {property.nearbyAttractions.map((attraction, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <MapPinIcon className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700">{attraction}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href={property.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                      >
                        <GlobeAltIcon className="h-5 w-5" />
                        <span>View on Map</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Agent & Contact */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <div className="text-center mb-6">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900">{property.agent.name}</h3>
                <p className="text-gray-600">Real Estate Agent</p>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.9 (156 reviews)</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>Call Agent</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  <span>Email Agent</span>
                </a>
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span>Schedule Tour</span>
                </button>
              </div>

              {/* Contact Form */}
              {showContactForm && (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    defaultValue={`I'm interested in ${property.title} at ${property.fullAddress}. Please contact me to schedule a viewing.`}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{property.type === 'rent' ? 'Rental' : 'For Sale'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot Size</span>
                  <span className="font-medium">{property.lotSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking</span>
                  <span className="font-medium">{property.parkingSpaces} spaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Virtual Tour - {property.title}</h2>
              <button
                onClick={() => setShowVirtualTour(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* YouTube Video Embed - Full Size */}
              {videoId && (
                <div className="relative overflow-hidden rounded-lg bg-black mb-6" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&showinfo=0&modestbranding=1`}
                    title="Property Virtual Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Tour Features Grid */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                  <EyeIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">360° Views</h4>
                  <p className="text-sm text-gray-600">Complete room coverage</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                  <CameraIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">HD Quality</h4>
                  <p className="text-sm text-gray-600">4K resolution</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                  <ClockIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Self-Guided</h4>
                  <p className="text-sm text-gray-600">At your own pace</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg text-center">
                  <PlayIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Interactive</h4>
                  <p className="text-sm text-gray-600">Click to explore</p>
                </div>
              </div>

              {/* Navigation Instructions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tour Navigation Tips</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Click and drag to look around</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Use arrows to move between rooms</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Click hotspots for room details</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Use fullscreen for best experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
