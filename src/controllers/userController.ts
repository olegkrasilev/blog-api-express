import { User } from '@src/models/entities/User';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestUser } from '@src/types/index';
import bcrypt from 'bcrypt';

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

export const createUser = async (request: RequestUser, response: Response) => {
  /*
Validate request for errors
*/

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  /*
  Check if this user exits
*/

  const { email, password } = request.body;
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return response.status(400).json({
      status: 'fail',
      data: 'This user already exist',
    });
  }

  /*
  Encrypts password and create user
*/

  if (password) {
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      email,
      encryptedPassword,
    });

    await user.save();

    return response.status(201).json({
      status: 'Success',
      data: 'User was created',
    });
  }
};
