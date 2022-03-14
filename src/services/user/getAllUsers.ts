import { NextFunction, Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const getAllUsers = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  const POST_TO_TAKE = 5;
  const REQUESTED_PAGE = Number(request.params.page);
  const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

  const [users, total] = await User.findAndCount({
    select: ['id', 'email', 'firstName', 'lastName'],
    take: POST_TO_TAKE,
    skip: POST_TO_SKIP,
  });

  return response.status(200).json({
    status: 'Success',
    total,
    users,
  });
});
