import { NextFunction, Response } from 'express';

import { RequestUser } from '../../types';

import { tryCatch } from '../../utils/tryCatch';

import { AppError } from '@src/utils/appError';
import { Posts } from '@src/models/entities/Post';

export const getUserPost = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const postID = request.params.id;

  if (!postID) {
    return next(new AppError('Please provide post ID', 400));
  }

  const postOfUser = await Posts.findOne({
    select: ['post', 'title', 'id', 'postCreationTime'],
    relations: ['user'],
    where: {
      id: postID,
    },
  });

  if (!postOfUser) {
    return next(new AppError('This post does not exists', 400));
  }

  const { post, title, postCreationTime, user } = postOfUser;
  const { firstName, lastName, email } = user;

  return response.status(200).json({
    status: 'success',
    post,
    title,
    postCreationTime,
    firstName,
    lastName,
    email,
  });
});
