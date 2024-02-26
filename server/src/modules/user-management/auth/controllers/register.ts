import { SendSuccessResponse } from '../../../../utils/response-helper';
import { TryCatch } from '../../../../utils/try-catch';
import { AuthServices } from '../services';

export const Register = TryCatch(async (req, res) => {
  await AuthServices.Register(req.body);

  return SendSuccessResponse(res, {
    data: null,
    message: 'Account Created Successfully',
    status: 200,
  });
});
