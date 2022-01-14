import { Response, NextFunction } from 'express';

import { findComment } from '@src/utils/findComment';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Comments } from '@src/models/entities/Comment';

export const deleteComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, postID, commentID } = request.body;

  if (!(userID && postID && commentID)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  const existingComment = await findComment(userID, postID, commentID);

  if (!existingComment) {
    return next(new AppError('This user or post or comment does not exist.', 404));
  }

  await Comments.delete(commentID);

  return response.status(204).json({
    status: 'success',
    data: undefined,
  });
});
