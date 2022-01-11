import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Posts } from '@src/models/entities/Post';

export const updatePost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { id, post, title } = request.body;
  const postId = id;

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

  const existingPost = await Posts.findOne(postId);

  if (!existingPost) {
    return next(new AppError('This post does not exist.', 404));
  }

  existingPost.post = post;
  existingPost.title = title;

  await existingPost.save();

  return response.json({
    status: 'success',
  });
});
