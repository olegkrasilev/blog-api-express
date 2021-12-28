import { Request, Response } from 'express';

export const getAllUsers = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'All users',
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
