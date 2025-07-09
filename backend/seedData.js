const mongoose = require('mongoose');
const Property = require('./models/Property');
const User = require('./models/User');
require('dotenv').config();

const sampleProperties = [
  {
    title: "Luxury Downtown Apartment",
    description: "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views. Features modern amenities, hardwood floors, and a spacious balcony perfect for entertaining.",
    price: 250,
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  },
  {
    title: "Cozy Suburban House",
    description: "Charming 3-bedroom house in a quiet suburban neighborhood. Features a large backyard, fireplace, and updated kitchen. Perfect for families looking for a peaceful retreat.",
    price: 180,
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  },
  {
    title: "Modern Loft with City Views",
    description: "Stylish industrial loft with exposed brick walls and floor-to-ceiling windows. Open floor plan with modern fixtures and appliances. Located in trendy arts district.",
    price: 320,
    location: "Chicago, IL",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    isAvailable: true
  },
  {
    title: "Beachfront Condo",
    description: "Stunning oceanfront condominium with panoramic beach views. Features 2 bedrooms, 2 bathrooms, and a private balcony. Access to pool, gym, and beach club.",
    price: 450,
    location: "Miami, FL",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    isAvailable: true
  },
  {
    title: "Historic Victorian Home",
    description: "Beautifully restored Victorian home with original hardwood floors and period details. Features 4 bedrooms, 3 bathrooms, and a wraparound porch. Located in historic district.",
    price: 200,
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  },
  {
    title: "Mountain Cabin Retreat",
    description: "Rustic log cabin nestled in the mountains with breathtaking views. Features 3 bedrooms, stone fireplace, and hot tub. Perfect for weekend getaways and outdoor enthusiasts.",
    price: 175,
    location: "Denver, CO",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  },
  {
    title: "Contemporary Penthouse",
    description: "Luxurious penthouse with 360-degree city views and rooftop terrace. Features 3 bedrooms, 2.5 bathrooms, and high-end finishes throughout. Private elevator access.",
    price: 600,
    location: "Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  },
  {
    title: "Charming Townhouse",
    description: "Elegant 3-story townhouse in a desirable neighborhood. Features 2 bedrooms, 2.5 bathrooms, and a private garden. Recently renovated with modern amenities.",
    price: 220,
    location: "Boston, MA",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a demo user as the owner of these properties
    let demoUser = await User.findOne({ email: 'demo@example.com' });
    
    if (!demoUser) {
      demoUser = new User({
        name: 'Demo Property Owner',
        email: 'demo@example.com',
        password: '$2b$10$demo.hashed.password.placeholder', // This won't be used for login
        role: 'user'
      });
      await demoUser.save();
      console.log('Demo user created');
    }

    // Clear existing properties (optional - remove if you want to keep existing ones)
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Add demo properties
    const propertiesWithOwner = sampleProperties.map(property => ({
      ...property,
      owner: demoUser._id
    }));

    await Property.insertMany(propertiesWithOwner);
    console.log(`Added ${sampleProperties.length} demo properties`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
