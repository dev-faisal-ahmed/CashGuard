import { Schema, model } from 'mongoose';
import { UserType } from './user.interface';

const UserSchema = new Schema<UserType>({
  user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
  balance: { type: Number, required: true, default: 40 },
});

export const UserModel = model('user', UserSchema);
