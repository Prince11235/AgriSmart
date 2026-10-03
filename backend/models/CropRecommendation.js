import mongoose from 'mongoose';

const cropRecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inputs: { type: Object, required: true },
  results: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const CropRecommendation = mongoose.model('CropRecommendation', cropRecommendationSchema);
