import { Response, NextFunction } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { Posts } from '@src/models/entities/Post';

export const createPost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { id, post, title } = request.body;

  const user = await User.findOne(id);

  const newPost = Posts.create({
    user,
    title,
    post,
  });

  await newPost.save();

  return response.json({
    status: 'success',
  });
});
