import React from 'react';
import { AnimatedSection } from '../utils/animations';
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  TrophyIcon, 
  HeartIcon,
  EyeIcon,
  StarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: TrophyIcon },
    { number: '5,000+', label: 'Happy Clients', icon: HeartIcon },
    { number: '2,500+', label: 'Properties Sold', icon: HomeIcon },
    { number: '50+', label: 'Expert Agents', icon: UserGroupIcon }
  ];

  const values = [
    {
      icon: HeartIcon,
      title: 'Client-Focused',
      description: 'We put our clients first in everything we do, ensuring their needs and dreams are our top priority.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty, building trust through every interaction.'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide, setting high standards for ourselves and the industry.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Innovation',
      description: 'We embrace new technologies and methods to provide cutting-edge real estate solutions.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'With over 20 years in real estate, Sarah founded Horizon Homes with a vision to revolutionize property services.',
      specialties: ['Luxury Properties', 'Investment Analysis', 'Market Strategy']
    },
    {
      name: 'Michael Chen',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Michael leads our sales team with expertise in residential and commercial property transactions.',
      specialties: ['Commercial Real Estate', 'Negotiations', 'Client Relations']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Emily oversees our property management division, ensuring optimal maintenance and tenant satisfaction.',
      specialties: ['Property Management', 'Tenant Relations', 'Maintenance Coordination']
    },
    {
      name: 'David Thompson',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'David drives our technological innovation, including virtual tours and digital property solutions.',
      specialties: ['PropTech', 'Virtual Tours', 'Digital Marketing']
    },
    {
      name: 'Lisa Park',
      role: 'Finance Specialist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Lisa helps clients navigate mortgage options and financial planning for their property investments.',
      specialties: ['Mortgage Advisory', 'Financial Planning', 'Investment Analysis']
    },
    {
      name: 'Robert Martinez',
      role: 'Market Analyst',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Robert provides market insights and trend analysis to help clients make informed decisions.',
      specialties: ['Market Analysis', 'Investment Strategy', 'Economic Research']
    }
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'Horizon Homes was established with a mission to transform the real estate experience.'
    },
    {
      year: '2012',
      title: 'First Major Expansion',
      description: 'Opened our second office and expanded our team to serve more clients across the region.'
    },
    {
      year: '2015',
      title: 'Technology Innovation',
      description: 'Launched our first virtual tour platform, revolutionizing property viewing experiences.'
    },
    {
      year: '2018',
      title: 'Award Recognition',
      description: 'Received "Real Estate Agency of the Year" award for outstanding client service.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Fully digitized our services, enabling seamless remote property transactions.'
    },
    {
      year: '2023',
      title: 'Market Leadership',
      description: 'Became the leading real estate agency in the region with over 5,000 satisfied clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">About Horizon Homes</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, we've been helping families and investors find their perfect properties. 
              Our commitment to excellence and innovation has made us a trusted name in real estate.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInLeft">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" 
                alt="Modern office building"
                className="rounded-2xl shadow-lg"
              />
            </AnimatedSection>
            
            <AnimatedSection animation="fadeInRight">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide exceptional real estate services that exceed our clients' expectations 
                    while building lasting relationships based on trust, integrity, and results. We 
                    strive to make the property buying, selling, and renting process as smooth and 
                    rewarding as possible.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To be the leading real estate company that transforms how people experience 
                    property transactions through innovative technology, personalized service, and 
                    deep market expertise. We envision a future where finding your dream home is 
                    effortless and enjoyable.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our clients and community.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to providing you with the best real estate service.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Company History */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to a market leader, here are the key milestones in our growth story.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection 
                  key={index} 
                  animation="fadeInUp" 
                  delay={index * 100}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {milestone.year.slice(-2)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          <p className="text-blue-600 font-semibold">{milestone.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" className="text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of satisfied clients who have found their dream properties with Horizon Homes. 
              Let us help you navigate your real estate journey with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us Today
              </a>
              <a 
                href="/properties" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Browse Properties
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default About;
