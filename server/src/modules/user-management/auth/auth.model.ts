import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { AuthType } from './auth.interface';
import { Roles, UserStatus } from './auth.constant';
import { salt } from '../../../config/config';

export const AuthSchema = new Schema<AuthType>({
  name: { type: String, required: true },
  pin: { type: String, required: true, select: false },
  mobile: { type: String, unique: true }, // admin does not need to provide mobile
  email: { type: String, required: true, unique: true },
  nid: { type: String, unique: true }, // admin does not need to provide to nid
  role: { type: String, enum: Roles, required: true },
  status: { type: String, enum: UserStatus, default: 'PENDING' },
});

// hashing password before we save it
AuthSchema.pre('save', async function (next) {
  const user = this;
  user.pin = await bcrypt.hash(user.pin, salt);

  next();
});

export const AuthModel = model('auth', AuthSchema);
