import { Response, NextFunction } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Posts } from '@src/models/entities/Post';

export const deletePost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { postID } = request.body;

  if (!postID) {
    return next(new AppError('No posts were found', 400));
  }

  const existingPost = await Posts.findOne(postID);

  if (!existingPost) {
    return next(new AppError('This post does not exist.', 404));
  }

  await Posts.delete(postID);

  return response.json({
    status: 'success',
    data: null,
  });
});
