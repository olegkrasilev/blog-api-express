import { Response, NextFunction } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';
import { Comments } from '@src/models/entities/Comment';
import { validateRequest } from '@src/utils/express-validator';

export const postComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, postID, comment } = request.body;

  if (!(userID && postID && comment)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  validateRequest(request, response);

  const user = await User.findOne(userID);
  const post = await Posts.findOne(postID);

  if (!(user && post)) {
    return next(new AppError('This user or post does not exist.', 404));
  }

  await Comments.create({ user, post, comment }).save();

  return response.json({
    status: 'success',
    data: {
      userID,
      postID,
      comment,
    },
  });
});
