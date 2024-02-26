import bcrypt from 'bcrypt';
import { RoleType, UserStatusType } from '../auth.interface';
import { AuthModel } from '../auth.model';
import { CreateAccountValidationSchemaType } from '../auth.validation';
import { salt } from '../../../../config/config';

export const Register = async (payload: CreateAccountValidationSchemaType) => {
  // hashing user's pin
  const { pin, role } = payload;
  const hashedPin = await bcrypt.hash(pin, salt);

  // updating balance and status
  const balance = (role as RoleType) === 'USER' ? 40 : 100000;
  const status: UserStatusType =
    (role as RoleType) === 'USER' ? 'APPROVED' : 'PENDING';

  // creating user account
  const userInfo = await AuthModel.create({
    ...payload,
    pin: hashedPin,
    balance,
    status,
  });
  const { pin: _, ...restUserInfo } = userInfo.toObject();
  return restUserInfo;
};
