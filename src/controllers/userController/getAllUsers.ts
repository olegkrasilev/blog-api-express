import { Request, Response } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';

export const getAllUsers = tryCatch(async (request: Request, response: Response) => {
  const allUsers = await User.find();

  if (allUsers.length === 0) {
    return response.status(400).json({
      status: 'fail',
      data: 'No users exist',
    });
  }

  const allUsersEmail = allUsers.map(user => user.email);

  return response.status(200).json({
    status: 'Success',
    length: allUsersEmail.length,
    data: allUsersEmail,
  });
});
