#!/bin/bash

# Real Estate Booking Application Start Script

echo "🏠 Starting Real Estate Booking Application..."
echo "============================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    if command -v brew &> /dev/null; then
        brew services start mongodb-community
    else
        echo "Please start MongoDB manually:"
        echo "sudo systemctl start mongod"
    fi
fi

echo "🚀 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "🚀 Starting frontend client..."
cd ../client
npm start &
CLIENT_PID=$!

echo "✅ Application started!"
echo "   Backend: http://localhost:5001"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $CLIENT_PID; exit" INT

wait
