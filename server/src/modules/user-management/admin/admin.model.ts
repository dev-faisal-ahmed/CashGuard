import { Schema, model } from 'mongoose';
import { AdminType } from './admin.interface';

const AdminSchema = new Schema<AdminType>({
  user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
  balance: { type: Number, required: true, default: 0 },
  totalMoney: { type: Number, required: true, default: 0 },
});

export const AdminModel = model('admin', AdminSchema);
