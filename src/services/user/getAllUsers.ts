import { NextFunction, Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const getAllUsers = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const allUsers = await User.find({ select: ['id', 'email', 'firstName', 'lastName'] });

  return response.status(200).json({
    status: 'Success',
    usersCount: allUsers.length,
    users: allUsers,
  });
});
