import { Router } from 'express';
import { AuthRouter } from '../modules/user-management/auth/auth.router';

export const AppRouter = Router();
AppRouter.use('/auth', AuthRouter);
