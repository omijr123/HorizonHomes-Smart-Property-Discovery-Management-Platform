import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  StarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import AnimatedSection from '../utils/animations';

const Agents = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const agents = [ 
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      image: "/images/agent1.jpg",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@horizonhomes.com",
      rating: 4.9,
      reviews: 156,
      experience: "8 years",
      properties: 145,
      specialty: "luxury",
      languages: ["English", "Spanish"],
      location: "Manhattan, NY",
      about: "Sarah specializes in luxury properties and high-end residential sales. With over 8 years of experience, she has helped numerous clients find their dream homes in Manhattan's most prestigious neighborhoods.",
      achievements: [
        "Top Producer 2023",
        "Luxury Home Specialist Certification",
        "Customer Service Excellence Award"
      ],
      specialties: ["Luxury Homes", "Penthouses", "Investment Properties"],
      certifications: ["CLHMS", "CRS", "GRI"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Commercial Property Specialist",
      image: "/images/agent2.jpg",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@horizonhomes.com",
      rating: 4.8,
      reviews: 203,
      experience: "12 years",
      properties: 278,
      specialty: "commercial",
      languages: ["English", "Mandarin", "Cantonese"],
      location: "Brooklyn, NY",
      about: "Michael is a commercial real estate expert with extensive experience in office buildings, retail spaces, and mixed-use developments. He has facilitated over $200M in commercial transactions.",
      achievements: [
        "Commercial Agent of the Year 2023",
        "CCIM Designation",
        "Multi-Million Dollar Producer"
      ],
      specialties: ["Office Buildings", "Retail Spaces", "Industrial Properties"],
      certifications: ["CCIM", "SIOR", "CPM"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "First-Time Buyer Specialist",
      image: "/images/agent3.jpg",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@horizonhomes.com",
      rating: 4.9,
      reviews: 189,
      experience: "6 years",
      properties: 167,
      specialty: "residential",
      languages: ["English", "Spanish", "Portuguese"],
      location: "Queens, NY",
      about: "Emily is passionate about helping first-time homebuyers navigate the real estate market. She provides personalized guidance and education throughout the entire buying process.",
      achievements: [
        "Rising Star Award 2023",
        "First-Time Buyer Specialist Certification",
        "Community Service Recognition"
      ],
      specialties: ["First-Time Buyers", "Family Homes", "Condominiums"],
      certifications: ["ABR", "SFR", "e-PRO"]
    },
    {
      id: 4,
      name: "David Thompson",
      title: "Investment Property Advisor",
      image: "/images/agent4.jpg",
      phone: "+1 (555) 456-7890",
      email: "david.thompson@horizonhomes.com",
      rating: 4.7,
      reviews: 124,
      experience: "10 years",
      properties: 198,
      specialty: "investment",
      languages: ["English", "French"],
      location: "Westchester, NY",
      about: "David helps investors build and manage their real estate portfolios. With a background in finance, he provides valuable insights into market trends and investment opportunities.",
      achievements: [
        "Investment Specialist of the Year",
        "CFA Certification",
        "Real Estate Investment Analysis Expert"
      ],
      specialties: ["Investment Properties", "Portfolio Management", "Market Analysis"],
      certifications: ["CFA", "CCIM", "CIPS"]
    },
    {
      id: 5,
      name: "Lisa Park",
      title: "Luxury Home Consultant",
      image: "/images/agent1.jpg",
      phone: "+1 (555) 567-8901",
      email: "lisa.park@horizonhomes.com",
      rating: 4.9,
      reviews: 143,
      experience: "9 years",
      properties: 132,
      specialty: "luxury",
      languages: ["English", "Korean", "Japanese"],
      location: "Manhattan, NY",
      about: "Lisa specializes in ultra-luxury properties and exclusive listings. She provides white-glove service to high-net-worth clients seeking premium real estate opportunities.",
      achievements: [
        "Luxury Sales Excellence Award",
        "International Property Specialist",
        "Top 1% of Luxury Agents Nationwide"
      ],
      specialties: ["Ultra-Luxury Homes", "International Clients", "Exclusive Listings"],
      certifications: ["CLHMS", "CIPS", "GUILD"]
    },
    {
      id: 6,
      name: "Robert Wilson",
      title: "Commercial Leasing Expert",
      image: "/images/agent2.jpg",
      phone: "+1 (555) 678-9012",
      email: "robert.wilson@horizonhomes.com",
      rating: 4.8,
      reviews: 167,
      experience: "11 years",
      properties: 245,
      specialty: "commercial",
      languages: ["English", "German"],
      location: "Brooklyn, NY",
      about: "Robert focuses on commercial leasing and tenant representation. He has extensive experience in negotiating complex lease agreements and finding the perfect spaces for businesses.",
      achievements: [
        "Commercial Leasing Champion",
        "Tenant Representation Expert",
        "Deal of the Year Award 2023"
      ],
      specialties: ["Commercial Leasing", "Tenant Representation", "Office Spaces"],
      certifications: ["SIOR", "CCIM", "CPM"]
    }
  ];

  const specialties = [
    { value: 'all', label: 'All Agents' },
    { value: 'luxury', label: 'Luxury Properties' },
    { value: 'commercial', label: 'Commercial Real Estate' },
    { value: 'residential', label: 'Residential Properties' },
    { value: 'investment', label: 'Investment Properties' }
  ];

  const filteredAgents = selectedSpecialty === 'all' 
    ? agents 
    : agents.filter(agent => agent.specialty === selectedSpecialty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <UserGroupIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Meet Our Expert Agents
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Work with Horizon Homes' top-rated real estate professionals who are committed to helping you achieve your property goals
            </p>
            <div className="flex items-center justify-center space-x-8 mt-8 text-lg">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="w-6 h-6" />
                <span>Award-Winning Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarSolidIcon className="w-6 h-6 text-yellow-400" />
                <span>4.8+ Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <BuildingOfficeIcon className="w-6 h-6" />
                <span>1000+ Properties Sold</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {specialties.map((specialty) => (
              <button
                key={specialty.value}
                onClick={() => setSelectedSpecialty(specialty.value)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedSpecialty === specialty.value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, index) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Agent Photo */}
                <div className="relative">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {agent.experience} Experience
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {agent.properties}+ Properties
                  </div>
                </div>

                {/* Agent Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                    <p className="text-blue-600 font-semibold">{agent.title}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">{agent.rating}</span>
                    <span className="ml-1 text-gray-500">({agent.reviews} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span>{agent.location}</span>
                  </div>

                  {/* About */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {agent.about}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {agent.specialties.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{agent.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <p className="text-sm text-gray-600">{agent.languages.join(', ')}</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                        <span>Email</span>
                      </a>
                    </div>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>Schedule Meeting</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Work with Our Expert Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with one of our experienced agents today and let us help you find your perfect property or sell your current home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                Contact Our Team
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
