import mongoose from 'mongoose';

const farmerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmAreaAcres: { type: Number, default: 5 },
  soilType: { type: String, default: 'Alluvial' },
  primaryCrops: [{ type: String }],
  experienceYears: { type: Number, default: 8 },
  preferredLanguage: { type: String, default: 'English' },
  irrigationType: { type: String, default: 'Drip & Canal' },
  farmImages: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

export const FarmerProfile = mongoose.model('FarmerProfile', farmerProfileSchema);
