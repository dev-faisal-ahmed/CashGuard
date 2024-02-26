import { Types } from 'mongoose';

export type RoleType = 'AGENT' | 'USER' | 'ADMIN';
export type UserStatusType = 'PENDING' | 'APPROVED' | 'BLOCKED';

export type AuthType = {
  _id: Types.ObjectId;
  name: string;
  pin: string;
  mobile: string;
  email: string;
  role: RoleType;
  nid: string;
  status: UserStatusType;
};
