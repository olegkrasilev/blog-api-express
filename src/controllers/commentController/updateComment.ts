import { Response, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Comments } from '@src/models/entities/Comment';
import { validateRequest } from '@src/utils/express-validator';

export const updateComment = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { userID, postID, commentID, comment } = request.body;

  if (!(userID && postID && comment && commentID)) {
    return next(new AppError('Comment field should be not empty!', 400));
  }

  validateRequest(request, response);

  const existingComment = await Comments.findOne(commentID, {
    relations: ['user', 'post'],
    where: {
      user: {
        id: userID,
      },
      post: {
        id: postID,
      },
    },
  });

  if (!existingComment) {
    return next(new AppError('This user or post or comment does not exist.', 404));
  }

  entityManager.merge(Comments, existingComment, { comment }).save();

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
