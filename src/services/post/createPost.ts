import { Response, NextFunction } from 'express';

import { validateRequest } from '@src/utils/express-validator';
import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';

export const createPost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, post, title } = request.body;

  if (!(userID && post && title)) {
    return next(new AppError('Post and title fields should be not empty!', 400));
  }

  validateRequest(request, response);

  const user = await User.findOne(userID);

  if (!user) {
    return next(new AppError('This user does not exist.', 404));
  }

  await Posts.create({
    user,
    post,
    title,
  }).save();

  return response.status(200).json({
    status: 'success',
    data: {
      userID,
      title,
      post,
    },
  });
});
