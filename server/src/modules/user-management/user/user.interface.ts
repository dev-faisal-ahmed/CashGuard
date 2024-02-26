import { Types } from 'mongoose';

export type UserType = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  role: 'USER';
  balance: number;
};
