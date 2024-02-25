import { SendSuccessResponse } from '../../../utils/response-helper';
import { TryCatch } from '../../../utils/try-catch';

export const Register = TryCatch(async (req, res) => {
  return SendSuccessResponse(res, {
    data: req.body,
    message: 'Account Created Successfully',
    status: 200,
  });
});
