import { Request, Response, NextFunction } from 'express';

import { AppError } from '@src/utils/appError';

export const errorHandler = (error: AppError, request: Request, response: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  response.status(statusCode).json({
    status,
    message: error.message,
  });
};
