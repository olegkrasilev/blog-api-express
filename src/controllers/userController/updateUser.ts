import { NextFunction, Response } from 'express';
import { getManager } from 'typeorm';
import { validationResult } from 'express-validator';

import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const updateUser = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  // 1) Create error if user POSTS password data
  const entityManager = getManager();
  const { id, email, lastName, firstName } = request.body;

  if (!(id && email && lastName && firstName)) {
    return next(new AppError('Please provide id,email, firstname and lastname', 400));
  }

  // Validate request for errors with Express-validator
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const newEmail = email;

  // 2) Update user document
  const [user] = await User.findByIds([id]);

  if (!user) {
    return next(new AppError('This user does not exist.', 404));
  }

  user.email = newEmail;
  user.firstName = firstName;
  user.lastName = lastName;
  await entityManager.save(user);

  return response.status(200).json({
    status: 'success',
  });
});
