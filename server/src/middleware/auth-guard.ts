import { jwtSecret } from '../config/config';
import { AuthModel } from '../modules/auth/auth-model';
import { AppError } from '../utils/app-error';
import { TryCatch } from '../utils/try-catch';
import jwt from 'jsonwebtoken';

export function AuthGuard() {
  return TryCatch(async (req, res, next) => {
    const token = req.headers.authorization;

    // if no token provided
    if (!token) throw new AppError('Unauthorized', 401);

    const decodeUser = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const { _id } = decodeUser;

    const user = AuthModel.findById(_id);
    if (!user) throw new AppError('User not found', 404);

    req.user = decodeUser;
    next();
  });
}
