import { NextFunction, Request, Response } from 'express';
import { SendErrorResponse } from '../utils/response-helper';
import { AppError } from '../utils/app-error';

export function GlobalErrorHandler<ErrorRequestHandler>(
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let status = error.status || 500;
  let message = error.message || 'Something went wrong';

  console.log(error);

  if (error instanceof AppError) {
    status = error.status;
    message = error.message;
  }

  if (error.name === 'ZodError') {
    message = 'Validation Error';
    status = 400;
  }

  return SendErrorResponse(res, { message, status, error });
}
