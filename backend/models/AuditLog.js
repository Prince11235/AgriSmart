import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  meta: { type: Object, default: {} },
  ip: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
