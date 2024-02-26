import { Types } from 'mongoose';

export type AdminType = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  role: 'ADMIN';
  balance: number;
  totalMoney: number;
};
