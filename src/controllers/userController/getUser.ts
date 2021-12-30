import { Request, Response } from 'express';
import { User } from '@src/models/entities/User';

export const getUser = async (request: Request, response: Response) => {
  const userId = request.params;
  const findUser = await User.findOne(userId);
  const userEmail = findUser?.email;

  response.status(200).json({
    status: 'Success',
    data: userEmail,
  });
};
