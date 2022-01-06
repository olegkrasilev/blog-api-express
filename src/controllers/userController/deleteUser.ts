import { Response, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';

export const deleteUser = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { id } = request.body;

  if (!id) {
    return next(new AppError('Please provide user ID', 400));
  }

  if (typeof id !== 'number') {
    return next(new AppError('User ID should be a number', 400));
  }

  const [user] = await User.findByIds([id]);

  await entityManager.delete(User, id);

  return response.status(204).json({
    status: 'success',
    data: undefined,
  });
});
