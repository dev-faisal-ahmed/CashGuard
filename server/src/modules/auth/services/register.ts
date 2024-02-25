import { salt } from '../../../config/config';
import { AppError } from '../../../utils/app-error';
import { AuthModel } from '../auth.model';
import { CreateAccountValidationSchemaType } from '../auth.validation';
import bcrypt from 'bcrypt';

export const Register = async (payload: CreateAccountValidationSchemaType) => {
  // hashing user's pin
  const { pin } = payload;
  const hashedPin = await bcrypt.hash(pin, salt);
  const userInfo = await AuthModel.create({ ...payload, pin: hashedPin });
  const { pin: _, ...restUserInfo } = userInfo.toObject();
  return restUserInfo;
};
