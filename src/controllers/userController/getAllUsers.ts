import { User } from '@src/models/entities/User';
import { Request, Response } from 'express';

export const getAllUsers = async (request: Request, response: Response) => {
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
};
