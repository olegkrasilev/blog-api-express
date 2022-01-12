import { NextFunction, Request, Response } from 'express';

import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getAllPosts = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const allPosts = await Posts.find({
    relations: ['user'],
  });

  if (allPosts.length === 0) {
    return next(new AppError('No posts exist', 400));
  }

  const allPostsData = allPosts.map(posts => {
    const { post, postCreationTime, id, title, user } = posts;
    const postId = id;
    const userId = user.id;

    return {
      title,
      post,
      postCreationTime,
      userId,
      postId,
    };
  });

  return response.status(200).json({
    status: 'Success',
    posts: allPosts.length,
    data: allPostsData,
  });
});
