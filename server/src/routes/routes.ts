import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.router';

export const AppRouter = Router();
AppRouter.use('/auth', AuthRouter);
