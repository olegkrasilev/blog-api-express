import { Request, Response } from 'express';
import { User } from '@src/models/entities/User';

export const getUser = async (request: Request, response: Response) => {
  const userId = request.params;

  const isUserExists = await User.findOne(userId);

  if (!isUserExists) {
    return response.status(400).json({
      status: 'fail',
      data: 'Current User dont exists',
    });
  }

  const userEmail = isUserExists?.email;

  return response.status(200).json({
    status: 'Success',
    data: userEmail,
  });
};
