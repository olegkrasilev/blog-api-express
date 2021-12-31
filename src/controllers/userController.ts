import { User } from '@src/models/entities/User';
import { Request, Response } from 'express';

export const updateUser = (request: Request, response: Response) =>
  response.status(200).json({
    status: 'Success',
    data: 'Updated User',
  });
