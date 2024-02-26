import { Schema, model } from 'mongoose';
import { TransferType } from './transfer.interface';

const TransferSchema = new Schema<TransferType>({
  trxId: { type: String, required: true, unique: true },
  sender: { type: Schema.Types.ObjectId, required: true, ref: 'auth' },
  receiver: { type: Schema.Types.ObjectId, required: true, ref: 'auth' },
  date: { type: Date, default: new Date() },
  amount: { type: Number, required: true },
});

export const SendMoneyModel = model('transfer', TransferSchema);
