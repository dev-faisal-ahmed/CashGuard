import { Types } from 'mongoose';
export type TransferType = {
  _id: Types.ObjectId;
  trxId: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  date: Date;
  amount: number;
};
