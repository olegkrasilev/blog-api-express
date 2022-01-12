import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';
import { Comments } from '@src/models/entities/Comment';

export const postComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, postID, comment } = request.body;

  if (!(userID && postID && comment)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  // Validate request for errors with Express-validator
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const user = await User.findOne(userID);
  const post = await Posts.findOne(postID);

  if (!(user && post)) {
    return next(new AppError('This user or post does not exist.', 404));
  }

  const newComment = Comments.create({
    user,
    post,
    comment,
  });

  await newComment.save();

  return response.json({
    status: 'success',
  });
});
