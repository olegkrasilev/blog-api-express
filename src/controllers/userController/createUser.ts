import { validationResult } from 'express-validator';
import { RequestUser } from '@src/types/index';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '@src/models/entities/User';

export const createUser = async (request: RequestUser, response: Response) => {
  const { email, password } = request.body;

  // Validate user input

  if (!(email && password)) {
    return response.status(400).json({
      status: 'fail',
      data: 'All input is required',
    });
  }

  // Validate request for errors

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  //  Check if this user exits

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return response.status(409).json({
      status: 'fail',
      data: 'This user already exist',
    });
  }

  //  Encrypts password and create user

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
