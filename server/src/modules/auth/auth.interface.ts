import { Types } from 'mongoose';

export type AccountType = 'AGENT' | 'USER' | 'ADMIN';

export type AuthType = {
  _id: Types.ObjectId;
  name: string;
  pin: string;
  mobile: string;
  email: string;
  accountType: string;
  nid: AccountType;
};
