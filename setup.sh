#!/bin/bash

# Real Estate Booking Application Setup Script

echo "🏠 Real Estate Booking Application Setup"
echo "======================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongo &> /dev/null && ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB first."
    echo "   You can also use MongoDB Atlas (cloud) by updating the MONGODB_URI in backend/.env"
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../client
npm install

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Start MongoDB service"
echo "   2. In terminal 1: cd backend && npm run dev"
echo "   3. In terminal 2: cd client && npm start"
echo "   4. Open http://localhost:3000 in your browser"
echo ""
echo "👤 Default admin credentials:"
echo "   You can register with role 'admin' to access admin features"
