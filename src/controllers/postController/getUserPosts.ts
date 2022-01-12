import { NextFunction, Response } from 'express';

import { RequestUser } from '@src/types/index';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getUserPosts = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { id } = request.body;
  const userId = id;

  if (!id) {
    return next(new AppError('This user does not exist', 400));
  }

  const postsOfUser = await Posts.find({
    relations: ['user'],
    where: {
      user: {
        id: userId,
      },
    },
  });

  const data = postsOfUser.map(item => {
    const { title, post, postCreationTime } = item;
    const postId = item.id;

    return {
      title,
      post,
      postCreationTime,
      postId,
    };
  });

  if (postsOfUser.length === 0) {
    return next(new AppError('No posts exist for current user', 400));
  }

  return response.status(200).json({
    status: 'success',
    userId,
    postsByUser: postsOfUser.length,
    data,
  });
});
