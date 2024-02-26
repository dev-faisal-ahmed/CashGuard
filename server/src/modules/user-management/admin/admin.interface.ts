import { Types } from 'mongoose';

export type AdminType = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  balance: number;
  totalMoney: number;
};
