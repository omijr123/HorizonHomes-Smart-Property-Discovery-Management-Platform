import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Properties from './components/Properties';
import AddProperty from './components/AddProperty';
import MyBookings from './components/MyBookings';
import AdminDashboard from './components/AdminDashboard';
import MortgageCalculator from './components/MortgageCalculator';
import FAQ from './components/FAQ';
import Neighborhoods from './components/Neighborhoods';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import About from './components/About';
import Blog from './components/Blog';
import Services from './components/Services';
import Agents from './components/Agents';
import Reviews from './components/Reviews';
import PropertyDetails from './components/PropertyDetails';
import PropertyComparison from './components/PropertyComparison';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/properties" 
              element={<Properties />} 
            />
            <Route 
              path="/property/:id" 
              element={<PropertyDetails />} 
            />
            <Route 
              path="/agents" 
              element={<Agents />} 
            />
            <Route 
              path="/reviews" 
              element={<Reviews />} 
            />
            <Route 
              path="/neighborhoods" 
              element={<Neighborhoods />} 
            />
            <Route 
              path="/compare" 
              element={<PropertyComparison />} 
            />
            <Route 
              path="/mortgage-calculator" 
              element={<MortgageCalculator />} 
            />
            <Route 
              path="/faq" 
              element={<FAQ />} 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/blog" 
              element={<Blog />} 
            />
            <Route 
              path="/services" 
              element={<Services />} 
            />
            <Route 
              path="/add-property" 
              element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-bookings" 
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
