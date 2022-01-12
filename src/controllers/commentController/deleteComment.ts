import { Response, NextFunction } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';
import { Comments } from '@src/models/entities/Comment';

export const deleteComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, postID, commentID } = request.body;

  if (!(userID && postID && commentID)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  const user = await User.findOne(userID);
  const post = await Posts.findOne(postID);
  const existingComment = await Comments.findOne(commentID);

  if (!(user && post && existingComment)) {
    return next(new AppError('This user or post or comment does not exist.', 404));
  }

  await Comments.delete(commentID);

  return response.status(204).json({
    status: 'success',
    data: undefined,
  });
});
