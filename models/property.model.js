const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  propertyType: { type: String, enum: ['house', 'apartment', 'condo', 'villa'], required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  squareFootage: { type: Number, required: true },
  images: [{ type: String }],
  features: [{ type: String }],
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  listingType: { type: String, enum: ['sale', 'rent'], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
