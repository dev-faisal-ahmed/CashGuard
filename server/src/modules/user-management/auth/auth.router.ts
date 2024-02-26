import { Router } from 'express';
import { ValidationHandler } from '../../../middleware/validation-handler';
import { AuthValidation } from './auth.validation';
import { AuthController } from './controllers';

export const AuthRouter = Router();

AuthRouter.post(
  '/register',
  ValidationHandler(AuthValidation.CreateAccountValidationSchema),
  AuthController.Register
);

AuthRouter.post(
  '/login',
  ValidationHandler(AuthValidation.LoginValidationSchema),
  AuthController.Login
);
