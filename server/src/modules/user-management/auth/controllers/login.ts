import { SendSuccessResponse } from '../../../../utils/response-helper';
import { TryCatch } from '../../../../utils/try-catch';
import { AuthServices } from '../services';

export const Login = TryCatch(async (req, res) => {
  const token = await AuthServices.Login(req.body);

  return SendSuccessResponse(res, {
    data: token,
    message: 'You are successfully logged in',
    status: 200,
  });
});
