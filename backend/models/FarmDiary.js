import mongoose from 'mongoose';

const farmDiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Expense', 'Income', 'Harvest', 'Irrigation', 'Fertilizer Application', 'Pest Spray'], required: true },
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  cropName: { type: String, default: 'Wheat' },
  notes: { type: String, default: '' },
  receiptImage: { type: String, default: '' }
});

export const FarmDiary = mongoose.model('FarmDiary', farmDiarySchema);
