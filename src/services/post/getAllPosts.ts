import { NextFunction, Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getAllPosts = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const allPosts = await Posts.find({
    select: ['post', 'postCreationTime', 'title', 'id'],
  });

  return response.status(200).json({
    status: 'Success',
    posts: allPosts.length,
    data: allPosts,
  });
});
