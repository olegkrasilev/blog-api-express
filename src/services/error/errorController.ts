import { Request, Response, NextFunction } from 'express';

import { AppError } from '@src/utils/appError';

const handleQueryFailedErrorDB = (error: AppError) => {
  const message = 'Invalid query parameter';

  return new AppError(message, 400);
};

const handleJWTExpiredError = (error: AppError) => new AppError('Your token has expired! PLease log in again', 401);
const handleJWTError = (error: AppError) => new AppError('Invalid Token! PLease log in again', 401);

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

    if (copyError?.driverError?.code === '22P02') {
      copyError = handleQueryFailedErrorDB(copyError);
    }

    if (copyError.name === 'JsonWebTokenError') {
      copyError = handleJWTError(copyError);
    }

    if (copyError.name === 'TokenExpiredError') {
      copyError = handleJWTExpiredError(copyError);
    }

    sendErrorProduction(copyError, response);
  }
};
