import { NextFunction, Request, Response } from 'express';
import { SendErrorResponse } from '../utils/response-helper';
import { AppError } from '../utils/app-error';
import { ZodError } from 'zod';

export function GlobalErrorHandler<ErrorRequestHandler>(
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let status = error.status || 500;
  let message = '';

  if (error instanceof AppError) {
    status = error.status;
    message = error.message;
  }

  // validation error
  else if (error.name === 'ZodError') {
    const issues = (error as ZodError).issues;
    const length = issues.length;

    for (let i = 0; i < length; i++) {
      message += issues[i].message;
      if (i !== length - 1) {
        message += ' ## ';
      }
    }
    status = 400;
  }

  // duplicate error
  else if (error.code === 11000) {
    const keyValues = Object.keys(error.keyValue);
    const length = keyValues.length;
    for (let i = 0; i < length; i++) {
      message += `${keyValues[i]} : ${error.keyValue[keyValues[i]]}`;
    }
    message += ' already exists';
  }

  // default error
  else {
    message = error.message || 'Something went wrong';
  }
  return SendErrorResponse(res, { message, status, error });
}
