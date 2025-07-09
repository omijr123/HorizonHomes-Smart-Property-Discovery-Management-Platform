import React, { useState } from 'react';
import { AnimatedSection } from '../utils/animations';
import { 
  HomeIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  MapPinIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  EyeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const mainServices = [
    {
      id: 'buying',
      icon: HomeIcon,
      title: 'Property Buying',
      subtitle: 'Find Your Dream Home',
      description: 'We guide you through every step of the home buying process, from initial search to closing day.',
      features: [
        'Personalized property matching',
        'Market analysis and pricing guidance',
        'Negotiation support',
        'Mortgage pre-approval assistance',
        'Home inspection coordination',
        'Closing process management'
      ],
      pricing: 'Commission-based - No upfront fees',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'selling',
      icon: BuildingOfficeIcon,
      title: 'Property Selling',
      subtitle: 'Maximize Your Property Value',
      description: 'Our comprehensive selling services ensure you get the best price for your property in the shortest time.',
      features: [
        'Professional property valuation',
        'Strategic marketing campaign',
        'Professional photography & virtual tours',
        'Staging consultation',
        'Buyer screening and management',
        'Contract negotiation and closing'
      ],
      pricing: 'Competitive commission rates',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'renting',
      icon: MapPinIcon,
      title: 'Property Rental',
      subtitle: 'Perfect Rental Solutions',
      description: 'Whether you\'re looking to rent or lease out a property, we handle all aspects of the rental process.',
      features: [
        'Tenant screening and background checks',
        'Lease agreement preparation',
        'Rent collection and management',
        'Property maintenance coordination',
        'Legal compliance assistance',
        '24/7 emergency support'
      ],
      pricing: 'Flexible fee structure',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      color: 'from-purple-600 to-violet-600'
    },
    {
      id: 'investment',
      icon: ChartBarIcon,
      title: 'Investment Advisory',
      subtitle: 'Smart Property Investments',
      description: 'Expert guidance on real estate investments to help you build wealth through property.',
      features: [
        'Market research and analysis',
        'ROI calculations and projections',
        'Portfolio diversification strategies',
        'Tax optimization advice',
        'Property management solutions',
        'Exit strategy planning'
      ],
      pricing: 'Consultation fees apply',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const additionalServices = [
    {
      icon: CalculatorIcon,
      title: 'Mortgage Calculator',
      description: 'Calculate your monthly payments and get pre-approved for financing.',
      link: '/mortgage-calculator'
    },
    {
      icon: EyeIcon,
      title: 'Virtual Tours',
      description: 'Experience properties through immersive 3D virtual tours.',
      link: '/properties'
    },
    {
      icon: DocumentTextIcon,
      title: 'Legal Services',
      description: 'Connect with trusted real estate attorneys and legal experts.',
      link: '/contact'
    },
    {
      icon: UserGroupIcon,
      title: 'Property Management',
      description: 'Full-service property management for investors and landlords.',
      link: '/contact'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Insurance Services',
      description: 'Get connected with top-rated insurance providers.',
      link: '/contact'
    },
    {
      icon: MapPinIcon,
      title: 'Neighborhood Analysis',
      description: 'Detailed insights into local markets and community features.',
      link: '/neighborhoods'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'First-time Homebuyer',
      content: 'The buying process was so smooth with their expert guidance. They found us the perfect home within our budget.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Property Investor',
      content: 'Their investment advisory service helped me build a profitable real estate portfolio. Excellent ROI on all recommendations.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Property Seller',
      content: 'Sold my house 20% above asking price thanks to their strategic marketing and staging advice. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5
    }
  ];

  const ServiceModal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="relative">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80`}></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <service.icon className="h-12 w-12 mb-4" />
            <h2 className="text-4xl font-bold mb-2">{service.title}</h2>
            <p className="text-xl text-gray-100">{service.subtitle}</p>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-gray-600 mb-8">{service.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-lg font-semibold text-gray-900 mb-2">{service.pricing}</p>
                <p className="text-gray-600 mb-6">
                  Get a detailed quote tailored to your specific needs and property requirements.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="/contact"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Get Quote
                  </a>
                  <a
                    href="/contact"
                    className="flex-1 border border-blue-600 text-blue-600 text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to meet all your property needs, 
              backed by years of expertise and market knowledge.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our primary services designed to handle all aspects of your real estate journey
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <AnimatedSection 
                key={service.id} 
                animation="fadeInUp" 
                delay={index * 100}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-70`}></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <service.icon className="h-8 w-8 mb-2" />
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-sm text-gray-100">{service.subtitle}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{service.pricing}</span>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      Learn More
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized services and tools to enhance your real estate experience
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a 
                  href={service.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Explore
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, transparent process designed to deliver exceptional results
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We start with understanding your needs and goals' },
              { step: '02', title: 'Strategy', description: 'Develop a customized plan tailored to your situation' },
              { step: '03', title: 'Execution', description: 'Professional implementation with regular updates' },
              { step: '04', title: 'Success', description: 'Achieve your real estate goals with ongoing support' }
            ].map((item, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience with our services
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" className="text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Let's discuss how our services can help you achieve your real estate goals. 
              Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <PhoneIcon className="h-5 w-5 mr-2" />
                Schedule Consultation
              </a>
              <a 
                href="mailto:info@horizonhomes.com" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Email Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
};

export default Services;
