import { NextFunction, Response } from 'express';

import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';
import { validateRequest } from '@src/utils/express-validator';

export const updateUser = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, email, lastName, firstName } = request.body;

  if (!(userID && email && lastName && firstName)) {
    return next(new AppError('Please provide id,email, firstName and lastName', 400));
  }

  validateRequest(request, response);

  const newEmail = email;

  // 2) Update user document
  const user = await User.findOne(userID);

  if (!user) {
    return next(new AppError('This user does not exist.', 404));
  }

  await User.merge(user, { email: newEmail, lastName, firstName }).save();

  return response.status(200).json({
    status: 'success',
    data: {
      newEmail,
      lastName,
      firstName,
    },
  });
});
