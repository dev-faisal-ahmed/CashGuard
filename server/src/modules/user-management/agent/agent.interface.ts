import { Types } from 'mongoose';

export type AgentType = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  balance: number;
};
