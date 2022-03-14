import { NextFunction, Response } from 'express';

import { RequestUser } from '@src/types/index';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getUserPosts = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const userID = request.params.id;

  const POST_TO_TAKE = 5;
  const REQUESTED_PAGE = Number(request.params.page);
  const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

  if (!userID) {
    return next(new AppError('This user does not exist', 400));
  }

  const [posts, total] = await Posts.findAndCount({
    select: ['post', 'title', 'id', 'postCreationTime'],
    relations: ['user'],
    where: {
      user: {
        id: userID,
      },
    },
    take: POST_TO_TAKE,
    skip: POST_TO_SKIP,
  });

  const selectPostFields = posts.map(userPost => {
    const { title, post, postCreationTime, id } = userPost;

    return {
      title,
      post,
      postCreationTime,
      id,
    };
  });

  return response.status(200).json({
    status: 'success',
    total,
    posts: selectPostFields,
  });
});
