import { User } from '@src/models/entities/User';
import { Request, Response } from 'express';

export const getAllUsers = async (request: Request, response: Response) => {
  const allUsers = await User.find();
  const allUsersEmail = allUsers.map(user => user.email);

  response.status(200).json({
    status: 'Success',
    length: allUsersEmail.length,
    data: allUsersEmail,
  });
};

export const getUser = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'User',
  });
};

export const updateUser = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'Updated User',
  });
};
