import { Schema, model } from 'mongoose';
import { AuthType } from './auth.interface';
import { Roles, UserStatus } from './auth.constant';

export const AuthSchema = new Schema<AuthType>({
  name: { type: String, required: true },
  pin: { type: String, required: true, select: false },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  nid: { type: String, required: true, unique: true },
  role: { type: String, enum: Roles, required: true },
  balance: { type: Number, required: true },
  status: { type: String, enum: UserStatus, default: 'PENDING' },
});

export const AuthModel = model('auth', AuthSchema);
