import { NextFunction, Request, Response } from 'express';

import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const getAllUsers = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const allUsers = await User.find();

  if (allUsers.length === 0) {
    return next(new AppError('No users exist', 400));
  }

  const allUsersEmail = allUsers.map(user => {
    const { id, email, firstName, lastName } = user;

    return {
      id,
      email,
      firstName,
      lastName,
    };
  });

  return response.status(200).json({
    status: 'Success',
    users: allUsersEmail.length,
    data: allUsersEmail,
  });
});
