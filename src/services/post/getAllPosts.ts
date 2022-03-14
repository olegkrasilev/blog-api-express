import { NextFunction, Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getAllPosts = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const POST_TO_TAKE = 5;
  const REQUESTED_PAGE = Number(request.params.page);
  const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

  const [posts, total] = await Posts.findAndCount({
    select: ['post', 'postCreationTime', 'title', 'id'],
    relations: ['user'],
    take: POST_TO_TAKE,
    skip: POST_TO_SKIP,
  });

  const selectPostFields = posts.map(data => {
    const { title, post, postCreationTime, user, id } = data;
    const { firstName, lastName } = user;

    return { title, post, postCreationTime, firstName, lastName, postID: id };
  });

  return response.status(200).json({
    status: 'Success',
    total,
    posts: selectPostFields,
  });
});
