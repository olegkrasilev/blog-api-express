import { Request, Response, NextFunction } from 'express';

import { AppError } from '@src/utils/appError';

const handleQueryFailedErrorDB = (error: AppError) => {
  const message = 'Invalid query parameter';

  return new AppError(message, 400);
};

const sendErrorDevelopment = (error: AppError, response: Response) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  return response.status(statusCode).json({
    status,
    error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProduction = (error: AppError, response: Response) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  if (error.isOperational) {
    return response.status(statusCode).json({
      status,
      message: error.message,
    });
  }

  console.error('ERROR', error);

  return response.status(500).json({
    status: 'error',
    message: 'Something went very wrong',
  });
};

export const errorHandler = (error: AppError, request: Request, response: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(error, response);
  }

  if (process.env.NODE_ENV === 'production') {
    let copyError = { ...error };

    if (copyError.driverError.code === '22P02') {
      copyError = handleQueryFailedErrorDB(copyError);
    }

    sendErrorProduction(copyError, response);
  }
};
