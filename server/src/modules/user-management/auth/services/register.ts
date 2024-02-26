import { RoleType, UserStatusType } from '../auth.interface';
import { AuthModel } from '../auth.model';
import { CreateAccountValidationSchemaType } from '../auth.validation';

export const Register = async (payload: CreateAccountValidationSchemaType) => {
  // updating balance and status
  const { role } = payload;
  const balance = (role as RoleType) === 'USER' ? 40 : 100000;
  const status: UserStatusType =
    (role as RoleType) === 'USER' ? 'APPROVED' : 'PENDING';

  // creating user account
  const userInfo = await AuthModel.create({
    ...payload,
    balance,
    status,
  });
  const { pin: _, ...restUserInfo } = userInfo.toObject();
  return restUserInfo;
};
