import React, { useState } from 'react';
import { AnimatedSection } from '../utils/animations';
import { 
  CalendarIcon,
  UserIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  ChevronRightIcon,
  TagIcon,
  ClockIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Blog = () => { 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'market-insights', name: 'Market Insights', count: 4 },
    { id: 'buying-guides', name: 'Buying Guides', count: 3 },
    { id: 'selling-tips', name: 'Selling Tips', count: 2 },
    { id: 'investment', name: 'Investment', count: 2 },
    { id: 'technology', name: 'Technology', count: 1 }
  ];

  const featuredPost = {
    id: 1,
    title: '2025 Real Estate Market Outlook: What Buyers and Sellers Need to Know',
    excerpt: 'As we move into 2025, the real estate market continues to evolve with new trends, technologies, and opportunities. Here\'s what industry experts predict for the coming year.',
    content: 'The real estate market in 2025 is expected to be characterized by technological innovation, sustainable housing solutions, and shifting buyer preferences...',
    author: {
      name: 'Sarah Johnson',
      role: 'Senior Market Analyst',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    publishDate: '2024-12-20',
    readTime: '8 min read',
    category: 'market-insights',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    tags: ['Market Analysis', 'Predictions', '2025 Trends'],
    views: 1248,
    likes: 89,
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: 'First-Time Homebuyer\'s Complete Guide to Getting Pre-Approved',
      excerpt: 'Learn the essential steps to get pre-approved for a mortgage and gain a competitive edge in today\'s market.',
      author: {
        name: 'Michael Chen',
        role: 'Mortgage Specialist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      publishDate: '2024-12-18',
      readTime: '6 min read',
      category: 'buying-guides',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
      tags: ['First Time Buyers', 'Mortgage', 'Pre-approval'],
      views: 892,
      likes: 45
    },
    {
      id: 3,
      title: 'How Virtual Tours Are Revolutionizing Property Viewing',
      excerpt: 'Discover how advanced virtual tour technology is changing the way buyers explore properties.',
      author: {
        name: 'David Thompson',
        role: 'Technology Director',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      publishDate: '2024-12-15',
      readTime: '5 min read',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      tags: ['Virtual Tours', 'Technology', 'Innovation'],
      views: 756,
      likes: 62
    },
    {
      id: 4,
      title: 'Top 10 Staging Tips to Sell Your Home Faster',
      excerpt: 'Professional staging advice to make your property stand out and attract more buyers.',
      author: {
        name: 'Emily Rodriguez',
        role: 'Staging Consultant',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
      },
      publishDate: '2024-12-12',
      readTime: '7 min read',
      category: 'selling-tips',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
      tags: ['Home Staging', 'Selling Tips', 'Interior Design'],
      views: 643,
      likes: 38
    },
    {
      id: 5,
      title: 'Investment Opportunities in Emerging Neighborhoods',
      excerpt: 'Identify up-and-coming areas with strong investment potential for long-term growth.',
      author: {
        name: 'Robert Martinez',
        role: 'Investment Advisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
      },
      publishDate: '2024-12-10',
      readTime: '9 min read',
      category: 'investment',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      tags: ['Investment', 'Neighborhoods', 'ROI'],
      views: 587,
      likes: 41
    },
    {
      id: 6,
      title: 'Understanding Current Mortgage Rates and Trends',
      excerpt: 'A comprehensive analysis of current mortgage rates and what they mean for buyers.',
      author: {
        name: 'Lisa Park',
        role: 'Finance Specialist',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100'
      },
      publishDate: '2024-12-08',
      readTime: '6 min read',
      category: 'market-insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      tags: ['Mortgage Rates', 'Finance', 'Market Analysis'],
      views: 734,
      likes: 29
    },
    {
      id: 7,
      title: 'Preparing Your Home for Winter: Essential Maintenance Tips',
      excerpt: 'Protect your investment with these crucial winter maintenance tasks for homeowners.',
      author: {
        name: 'James Wilson',
        role: 'Property Manager',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      publishDate: '2024-12-05',
      readTime: '5 min read',
      category: 'selling-tips',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600',
      tags: ['Home Maintenance', 'Winter Prep', 'Property Care'],
      views: 456,
      likes: 22
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post, featured = false }) => (
    <AnimatedSection 
      animation="fadeInUp" 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? 'h-64 lg:h-80' : 'h-48'
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {categories.find(cat => cat.id === post.category)?.name}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{formatDate(post.publishDate)}</span>
          <ClockIcon className="h-4 w-4 ml-4 mr-2" />
          <span>{post.readTime}</span>
        </div>

        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>

        <p className={`text-gray-600 mb-4 ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              <TagIcon className="h-3 w-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-1" />
              {post.views}
            </span>
            <span className="flex items-center">
              <HeartIcon className="h-4 w-4 mr-1" />
              {post.likes}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Read Full Article
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Horizon Homes Blog</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest real estate insights, market trends, and expert advice 
              to help you make smarter property decisions.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="mb-8">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Featured Post */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Article</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular and insightful article this month
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover expert insights and practical advice for your real estate journey
            </p>
          </AnimatedSection>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" className="text-white">
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and never miss the latest real estate insights and market updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Blog;
