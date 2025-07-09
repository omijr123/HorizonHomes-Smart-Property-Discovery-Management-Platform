import React, { useState } from 'react';
import { AnimatedSection } from '../utils/animations';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '', 
    contactMethod: 'email',
    propertyType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactMethod: 'email',
        propertyType: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: 'info@horizonhomes.com',
      subtitle: 'Online support'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      details: '123 Horizon Homes Ave',
      subtitle: 'City, State 12345'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      details: 'Mon-Fri: 8:00 AM - 6:00 PM',
      subtitle: 'Sat-Sun: 9:00 AM - 4:00 PM'
    }
  ];

  const services = [
    { icon: BuildingOfficeIcon, title: 'Property Sales', description: 'Buy and sell residential and commercial properties' },
    { icon: UserGroupIcon, title: 'Property Management', description: 'Complete property management services' },
    { icon: ChatBubbleLeftRightIcon, title: 'Consultation', description: 'Expert real estate consultation and advice' }
  ];

  const officeLocations = [
    {
      name: 'Downtown Office',
      address: '123 Horizon Homes Ave, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'downtown@horizonhomes.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    },
    {
      name: 'Westside Branch',
      address: '456 West Street, City, State 12345',
      phone: '+1 (555) 123-4568',
      email: 'westside@horizonhomes.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'
    },
    {
      name: 'Northside Location',
      address: '789 North Avenue, City, State 12345',
      phone: '+1 (555) 123-4569',
      email: 'northside@horizonhomes.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to find your dream home? Get in touch with our expert team for personalized assistance.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help you with all your real estate needs. Reach out through any of these channels.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-blue-600 font-semibold mb-1">{item.details}</p>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection animation="fadeInLeft">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type
                        </label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select property type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="land">Land</option>
                          <option value="rental">Rental</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Email
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={formData.contactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Phone
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us more about your needs..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Map and Location Info */}
            <AnimatedSection animation="fadeInRight">
              <div className="space-y-8">
                {/* Interactive Map Placeholder */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden group cursor-pointer">
                    <a 
                      href="https://maps.app.goo.gl/yZ18Q36hu28wyjMVA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-300"
                    >
                      <div className="text-center">
                        <MapPinIcon className="h-12 w-12 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-blue-800 font-semibold">Click to Open Interactive Map</p>
                        <p className="text-sm text-blue-600 mt-1">123 Horizon Homes Ave, City, State 12345</p>
                        <div className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          View on Google Maps
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-3" />
                    <span>123 Horizon Homes Ave, City, State 12345</span>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our convenient locations across the city.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{location.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.email}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.hours}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
