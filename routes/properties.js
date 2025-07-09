const express = require('express');
const Property = require('../models/Property');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all available properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's properties
router.get('/my-properties', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new property
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, location, imageUrl } = req.body;
    
    const property = new Property({
      title,
      description,
      price,
      location,
      imageUrl,
      owner: req.user._id
    });
    
    await property.save();
    await property.populate('owner', 'name email');
    
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found or not authorized' });
    }
    
    const { title, description, price, location, imageUrl } = req.body;
    
    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.imageUrl = imageUrl || property.imageUrl;
    
    await property.save();
    await property.populate('owner', 'name email');
    
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ 
      _id: req.params.id, 
      owner: req.user._id 
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found or not authorized' });
    }
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
