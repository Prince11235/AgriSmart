import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Seeds', 'Fertilizers', 'Equipment', 'Pesticides', 'Fresh Harvest'], required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  stock: { type: Number, default: 100 },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 34 },
  image: { type: String, required: true },
  description: { type: String, required: true },
  sellerName: { type: String, default: 'AgriSmart Store' },
  isOrganic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);
