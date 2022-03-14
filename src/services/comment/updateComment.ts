import { Response, NextFunction } from 'express';

import { findComment } from '@src/utils/findComment';
import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Comments } from '@src/models/entities/Comment';
import { validateRequest } from '@src/utils/express-validator';

export const updateComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, postID, commentID, comment } = request.body;

  if (!(userID && postID && comment && commentID)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  validateRequest(request, response);

  const existingComment = await findComment(userID, postID, commentID);

  if (!existingComment) {
    return next(new AppError('This user or post or comment does not exist.', 404));
  }

  await Comments.merge(existingComment, { comment }).save();

  return response.json({
    status: 'success',
    data: {
      userID,
      postID,
      commentID,
      comment,
    },
  });
});
