const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  address: { type: String, default: '' },
  role: { type: String, enum: ['user', 'agent', 'admin'], default: 'user' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
