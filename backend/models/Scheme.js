import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  benefitAmount: { type: String, required: true },
  eligibilityCriteria: [{ type: String }],
  stateApplicable: { type: String, default: 'All India' },
  applicationDeadline: { type: String, default: '2026-12-31' },
  officialLink: { type: String, default: 'https://pmkisan.gov.in' },
  category: { type: String, enum: ['Subsidy', 'Insurance', 'Credit Loan', 'Equipment', 'Organic Farming'], default: 'Subsidy' },
  createdAt: { type: Date, default: Date.now }
});

export const Scheme = mongoose.model('Scheme', schemeSchema);
