import { Response, NextFunction } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { Posts } from '@src/models/entities/Post';
import { validateRequest } from '@src/utils/express-validator';

export const updatePost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { postID, post, title } = request.body;

  if (!(postID && post && title)) {
    return next(new AppError('Post and title fields should be not empty!', 400));
  }

  validateRequest(request, response);

  const existingPost = await Posts.findOne(postID);

  if (!existingPost) {
    return next(new AppError('This post does not exist.', 404));
  }

  await Posts.merge(existingPost, { post, title }).save();

  return response.json({
    status: 'success',
    data: {
      postID,
      post,
      title,
    },
  });
});
