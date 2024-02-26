import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';
import { AuthModel } from '../modules/auth/auth.model';
import { AppError } from '../utils/app-error';
import { TryCatch } from '../utils/try-catch';
import { RoleType } from '../modules/auth/auth.interface';

export function AuthGuard(...requiredRoles: RoleType[]) {
  return TryCatch(async (req, _, next) => {
    const token = req.headers.authorization;

    // if no token provided
    if (!token) throw new AppError('Unauthorized', 401);

    const decodeUser = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const { _id } = decodeUser;

    // checking if user found
    const user = await AuthModel.findById(_id);
    if (!user) throw new AppError('User not found', 404);

    // checking if user is blocked or approved or pending
    const { status, role } = user;
    if (status === 'BLOCKED') throw new AppError('User is blocked', 401);
    else if (status === 'PENDING')
      throw new AppError('User is not approved yet', 401);

    if (!requiredRoles.includes(role))
      throw new AppError('You are not authorized', 401);

    req.user = user;
    next();
  });
}
