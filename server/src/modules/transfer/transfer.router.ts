import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth-guard';
import { ValidationHandler } from '../../middleware/validation-handler';
import { TransferValidation } from './transfer.validation';

export const TransferRouter = Router();

TransferRouter.post(
  '/',
  AuthGuard('USER'),
  ValidationHandler(TransferValidation.AddTransferValidationSchema)
);
