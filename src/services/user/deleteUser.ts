import { Response, NextFunction } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';

export const deleteUser = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID } = request.body;

  if (!userID) {
    return next(new AppError('Please provide user ID', 400));
  }

  await User.delete(userID);

  response.clearCookie('jwtAccessToken');
  response.clearCookie('jwtRefreshToken');

  return response.status(204).json({
    status: 'success',
    data: undefined,
  });
});
