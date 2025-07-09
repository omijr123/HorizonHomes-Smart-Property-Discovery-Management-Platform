const express = require('express');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create a booking (buy property)
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId } = req.body;
    
    // Find the property
    const property = await Property.findById(propertyId).populate('owner');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if property is available
    if (!property.isAvailable) {
      return res.status(400).json({ message: 'Property is not available' });
    }
    
    // Check if user is not buying their own property
    if (property.owner._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot buy your own property' });
    }
    
    // Create booking
    const booking = new Booking({
      property: propertyId,
      buyer: req.user._id,
      seller: property.owner._id,
      price: property.price
    });
    
    await booking.save();
    
    // Mark property as not available
    property.isAvailable = false;
    await property.save();
    
    // Populate booking details
    await booking.populate([
      { path: 'property', select: 'title description price location imageUrl' },
      { path: 'buyer', select: 'name email' },
      { path: 'seller', select: 'name email' }
    ]);
    
    res.status(201).json({
      message: 'Property booked successfully',
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's bookings (purchases)
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ buyer: req.user._id })
      .populate('property', 'title description price location imageUrl')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('property', 'title description price location imageUrl')
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property', 'title description price location imageUrl')
      .populate('buyer', 'name email')
      .populate('seller', 'name email');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized (buyer, seller, or admin)
    const isAuthorized = 
      booking.buyer._id.toString() === req.user._id.toString() ||
      booking.seller._id.toString() === req.user._id.toString() ||
      req.user.role === 'admin';
    
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
