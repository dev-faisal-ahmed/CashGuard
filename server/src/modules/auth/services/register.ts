import bcrypt from 'bcrypt';
import { salt } from '../../../config/config';
import { RoleType } from '../auth.interface';
import { AuthModel } from '../auth.model';
import { CreateAccountValidationSchemaType } from '../auth.validation';

export const Register = async (payload: CreateAccountValidationSchemaType) => {
  // hashing user's pin
  const { pin, role } = payload;
  const hashedPin = await bcrypt.hash(pin, salt);

  // updating balance
  const balance = (role as RoleType) === 'USER' ? 40 : 100000;

  // creating user account
  const userInfo = await AuthModel.create({
    ...payload,
    pin: hashedPin,
    balance,
  });
  const { pin: _, ...restUserInfo } = userInfo.toObject();
  return restUserInfo;
};
