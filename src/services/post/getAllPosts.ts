import { NextFunction, Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getAllPosts = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const allPosts = await Posts.find({
    select: ['post', 'postCreationTime', 'title', 'id'],
    relations: ['user'],
  });

  const AllUsersPosts = allPosts.map(data => {
    const { title, post, postCreationTime, user } = data;
    const { firstName, lastName } = user;

    return { title, post, postCreationTime, firstName, lastName };
  });

  return response.status(200).json({
    status: 'Success',
    NumberOfPosts: allPosts.length,
    posts: AllUsersPosts,
  });
});
