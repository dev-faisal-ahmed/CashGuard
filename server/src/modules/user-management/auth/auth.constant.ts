import { RoleType, UserStatusType } from './auth.interface';

export const Roles: RoleType[] = ['USER', 'AGENT', 'ADMIN'];
export const UserStatus: UserStatusType[] = ['PENDING', 'APPROVED', 'BLOCKED'];
