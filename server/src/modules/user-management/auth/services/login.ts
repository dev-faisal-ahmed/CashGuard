import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthModel } from '../auth.model';
import { LoginValidationSchemaType } from '../auth.validation';
import { AppError } from '../../../../utils/app-error';
import { jwtSecret } from '../../../../config/config';

export const Login = async (payload: LoginValidationSchemaType) => {
  const { email, mobile, pin } = payload;

  //  if no email or mobile number is provided
  if (!email && !mobile)
    throw new AppError('Please at least provide phone number or email', 400);

  // checking if user exist
  const userInfo = await AuthModel.findOne(
    { $or: [{ email }, { mobile }] },
    { _id: 1, role: 1, pin: 1 }
  );

  if (!userInfo) throw new AppError('User not found', 404);

  // matching the password
  const isPassWordMatched = await bcrypt.compare(pin, userInfo.pin);
  if (!isPassWordMatched) throw new AppError('Password does not match', 401);

  const { _id } = userInfo.toObject();

  // generating token
  const token = jwt.sign({ _id }, jwtSecret, { expiresIn: '60d' });
  return token;
};
