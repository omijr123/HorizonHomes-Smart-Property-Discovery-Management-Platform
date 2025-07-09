const express = require('express');
const router = express.Router();
const Property = require('../models/property.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_jwt_secret";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({ status: 'available' }).populate('owner', 'name email phone');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET properties by user (authenticated)
router.get('/my-properties', authenticateToken, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a property (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const propertyData = { ...req.body, owner: req.user.id };
    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a property (authenticated, owner only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user.id });
    if (!property) return res.status(404).json({ message: 'Property not found or unauthorized' });
    
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a property (authenticated, owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user.id });
    if (!property) return res.status(404).json({ message: 'Property not found or unauthorized' });
    
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
