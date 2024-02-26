import { Schema, model } from 'mongoose';
import { AdminType } from './admin.interface';
import { UserRoleConstants } from '../user.constant';

const AdminSchema = new Schema<AdminType>({
  user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
  balance: { type: Number, required: true, default: 0 },
  role: { type: String, enum: [UserRoleConstants.ADMIN], required: true },
  totalMoney: { type: Number, required: true, default: 0 },
});

export const AdminModel = model('admin', AdminSchema);
