import { NextFunction, Request, Response } from 'express';

import { getManager } from 'typeorm';

import { User } from '@src/models/entities/User';

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  // 1) Create error if user POSTS password data
  const entityManager = getManager();
  const { password, id, email } = request.body;
  const newEmail = email;

  if (password) {
    return response.status(400).json({
      status: 'fail',
      message: 'This route is not for password updates. Please use /updatePassword',
    });
  }

  // 2) Update user document
  const [user] = await User.findByIds([id]);

  user.email = newEmail;
  await entityManager.save(user);

  return response.status(200).json({
    status: 'success',
  });
};
