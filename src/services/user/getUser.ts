import { NextFunction, Response } from 'express';

import { RequestUser } from '@src/types/index';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const getUser = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID } = request.body;

  const user = await User.findOne(userID);

  if (!user) {
    return next(new AppError('Current User dont exists', 404));
  }

  const { email, firstName, lastName } = user;

  return response.status(200).json({
    status: 'Success',
    data: { userID, email, firstName, lastName },
  });
});
