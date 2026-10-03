import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Farmer', 'Expert', 'Agricultural Officer', 'Marketplace Seller', 'Government Admin', 'Super Admin'],
    default: 'Farmer'
  },
  isVerified: { type: Boolean, default: true },
  profilePicture: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
  location: {
    state: { type: String, default: 'Punjab' },
    district: { type: String, default: 'Ludhiana' },
    village: { type: String, default: 'Samrala' },
    lat: { type: Number, default: 30.9 },
    lng: { type: Number, default: 75.85 }
  },
  refreshToken: { type: String, default: '' },
  googleId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
