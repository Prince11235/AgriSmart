import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { Product } from '../models/Product.js';
import { Scheme } from '../models/Scheme.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

const roles = [
  { email: 'farmer@agrismart.demo', name: 'Rajesh Kumar', role: 'Farmer' },
  { email: 'expert@agrismart.demo', name: 'Dr. Ananya Singh', role: 'Expert' },
  { email: 'officer@agrismart.demo', name: 'Vikram Patel', role: 'Agricultural Officer' },
  { email: 'seller@agrismart.demo', name: 'GreenMart Agro', role: 'Marketplace Seller' },
  { email: 'gov@agrismart.demo', name: 'Ministry Admin', role: 'Government Admin' },
  { email: 'admin@agrismart.demo', name: 'Super Admin', role: 'Super Admin' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrismart');
    console.log('[Seed] Connected to MongoDB');

    await User.deleteMany({});
    await FarmerProfile.deleteMany({});
    await Product.deleteMany({});
    await Scheme.deleteMany({});
    await Notification.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 12);
    const users = [];

    for (const entry of roles) {
      const user = await User.create({
        ...entry,
        password: passwordHash,
        phone: '+91 98765 43210',
        isVerified: true,
        location: { state: 'Punjab', district: 'Ludhiana', village: 'Samrala', lat: 30.9, lng: 75.85 },
      });
      users.push(user);
      if (entry.role === 'Farmer') {
        await FarmerProfile.create({
          userId: user._id,
          farmAreaAcres: 12,
          soilType: 'Alluvial',
          primaryCrops: ['Wheat', 'Rice', 'Mustard'],
          experienceYears: 15,
        });
        await Notification.insertMany([
          {
            userId: user._id,
            title: 'Weather Alert',
            body: 'Moderate rainfall expected in Ludhiana within 48 hours.',
            type: 'weather',
          },
          {
            userId: user._id,
            title: 'Fertilizer Reminder',
            body: 'Schedule urea top-dressing after rain subsides.',
            type: 'fertilizer',
          },
        ]);
      }
    }

    await Product.insertMany([
      {
        title: 'HD-3089 Hybrid Wheat Seeds',
        description: 'High-yield certified wheat variety suited for Rabi season in North India.',
        category: 'Seeds',
        price: 2450,
        stock: 120,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80',
        sellerName: 'GreenMart Agro',
      },
      {
        title: 'Bio-NPK Organic Blend',
        description: 'Slow-release organic micronutrient mix for sustainable soil health.',
        category: 'Fertilizers',
        price: 890,
        stock: 300,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
        sellerName: 'GreenMart Agro',
      },
    ]);

    await Scheme.insertMany([
      {
        title: 'PM-KISAN Direct Benefit Transfer',
        description: '₹6,000 per year in three equal installments for eligible farmer families.',
        eligibility: 'Small and marginal farmers with valid land records',
        state: 'All India',
        category: 'Income Support',
      },
      {
        title: 'Soil Health Card Scheme',
        description: 'Free soil testing and nutrient management advisory every 2 years.',
        eligibility: 'All farmers with Aadhaar-linked accounts',
        state: 'All India',
        category: 'Soil Health',
      },
    ]);

    console.log('[Seed] Created demo users (password: password123):');
    roles.forEach((r) => console.log(`  - ${r.email} (${r.role})`));
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]', err);
    process.exit(1);
  }
};

seed();
