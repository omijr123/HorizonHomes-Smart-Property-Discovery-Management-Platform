# 🌇 Horizon Homes: Smart Property Discovery & Management Platform

![Horizon Homes Banner](https://via.placeholder.com/1200x400/1e3a8a/ffffff?text=Horizon+Homes+%E2%80%93+Where+Dream+Homes+Come+True)

**Horizon Homes** is a cutting-edge MERN stack real estate platform revolutionizing property search, listing, and reservation. Designed for both property seekers and professionals, it offers a seamless, secure, and feature-rich experience for all real estate needs.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?logo=react&logoColor=white)
![Node.js Version](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
[![React Version](https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | JWT-based login with role-based access (Visitor, Agent, Admin) |
| 🏠 **Real-Time Property Management** | Full CRUD operations for property listings with instant updates |
| 💳 **Online Booking & Payments** | Secure reservation system with payment processing |
| 🧮 **Mortgage Calculator** | Estimate monthly payments based on financial inputs |
| 📍 **Neighborhood Insights** | Local area information (schools, transport, safety ratings) |
| 📱 **Mobile-First Design** | Fully responsive across all devices |
| 📊 **Admin Dashboard** | Comprehensive management of users, properties & bookings |
| 🖼️ **Virtual Tours** | Interactive 360° property exploration |
| 🔍 **Advanced Search** | Filter properties by location, price, amenities & more |
| ⚖️ **Property Comparison** | Side-by-side comparison of up to 3 properties |

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### Utilities & Services
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Google Maps API](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## 📂 Project Structure

```
real-estate/
├── backend/               # Backend server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware (authentication, etc.)
│   ├── models/           # MongoDB models (User, Property, Booking)
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── .env              # Environment variables
│   ├── server.js         # Main server file
│   └── package.json
├── client/                # Frontend React app
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── assets/       # Images, icons, etc.
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context providers
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service functions
│   │   ├── styles/       # CSS files
│   │   ├── utils/        # Frontend utilities
│   │   ├── App.jsx       # Main application component
│   │   └── index.jsx     # Entry point
│   ├── .env
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/horizon-homes.git
cd horizon-homes
```

2. **Install backend dependencies**:
```bash
cd backend
npm install
```

3. **Install frontend dependencies**:
```bash
cd ../client
npm install
```

4. **Set up environment variables**:
Create a `.env` file in the `backend` directory with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. **Seed the database (optional)**:
```bash
cd backend
npm run seed
```

6. **Start the development servers**:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../client
npm run dev
```

7. **Access the application**:
Open your browser and visit `http://localhost:3000`

## 📸 Screenshots

![pic1](https://i.postimg.cc/GmqqLkkp/Screenshot-2025-07-08-111527.png)

## 💻 Code Snippets

### Backend: Property Model
```javascript
// backend/models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  amenities: [String],
  virtualTourUrl: String,
  mapUrl: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
```

### Frontend: Mortgage Calculator
```jsx
// client/src/components/MortgageCalculator.jsx
import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: 300000,
    downPayment: 60000,
    loanTerm: 30,
    interestRate: 4.5,
  });

  const calculatePayment = () => {
    const { homePrice, downPayment, loanTerm, interestRate } = formData;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = (
      loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
    
    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Mortgage Calculator</h2>
      {/* Input fields and calculation display */}
    </div>
  );
};
```

## 🏗️ Architecture Overview

```mermaid
graph TD
    A[Client - React] -->|API Requests| B[Server - Express.js]
    B --> C[Database - MongoDB]
    C -->|Data Storage| D[(Properties)]
    C -->|Data Storage| E[(Users)]
    C -->|Data Storage| F[(Bookings)]
    A --> G[External APIs]
    G --> H[Google Maps]
    G --> I[Payment Gateway]
    G --> J[Cloud Storage]
```

## 🔧 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **Real-Time Data Sync** | Implemented MongoDB Change Streams for instant updates |
| **Role-Based Access** | JWT authentication with middleware authorization checks |
| **Image Handling** | Cloudinary integration with compression and lazy loading |
| **Search Performance** | MongoDB indexing and optimized query design |
| **Payment Processing** | Stripe integration with secure payment intents |
| **Responsive Design** | Mobile-first approach with Tailwind CSS |

## 📊 Database Schema

```mermaid
erDiagram
    USERS ||--o{ PROPERTIES : owns
    USERS ||--o{ BOOKINGS : makes
    PROPERTIES ||--o{ BOOKINGS : has
    
    USERS {
        string name
        string email
        string password
        string role
        date createdAt
    }
    
    PROPERTIES {
        string title
        string description
        number price
        string location
        string imageUrl
        boolean isAvailable
        date createdAt
    }
    
    BOOKINGS {
        ObjectId propertyId
        ObjectId userId
        number price
        string status
        date createdAt
    }
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Contributors

- [Your Name](https://github.com/your-profile)
- [Team Member 2](https://github.com/team-member2)

---

**Find your dream home today with Horizon Homes!** 🏡  
[Live Demo](https://horizon-homes-demo.com) | [API Documentation](https://horizon-homes-api.com) | [Support](mailto:support@horizon-homes.com)
