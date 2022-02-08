import { NextFunction, Response } from 'express';

import { RequestUser } from '@src/types/index';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { Posts } from '@src/models/entities/Post';

export const getUserPosts = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const userID = request.params.id;

  if (!userID) {
    return next(new AppError('This user does not exist', 400));
  }

  const postsOfUser = await Posts.find({
    select: ['post', 'title', 'id', 'postCreationTime'],
    relations: ['user'],
    where: {
      user: {
        id: userID,
      },
    },
  });

  const posts = postsOfUser.map(userPost => {
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
    userID,
    postsByUser: postsOfUser.length,
    posts,
  });
});
