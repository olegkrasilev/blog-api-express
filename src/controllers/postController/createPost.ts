import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';

export const createPost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { id, post, title } = request.body;

  if (!(id && post && title)) {
    return next(new AppError('Post and title fields should be not empty!', 400));
  }

  // Validate request for errors with Express-validator
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const user = await User.findOne(id);

  if (!user) {
    return next(new AppError('This user does not exist.', 404));
  }

  const newPost = Posts.create({
    user,
    title,
    post,
  });

  await newPost.save();

  return response.json({
    status: 'success',
  });
});
