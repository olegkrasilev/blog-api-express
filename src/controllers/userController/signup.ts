import { RequestUser } from '@src/types/index';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '@src/models/entities/User';

export const signup = async (request: RequestUser, response: Response) => {
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

  //  Encrypt password and create user

  const encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = User.create({
    email,
    encryptedPassword,
  });

  await newUser.save();

  newUser.encryptedPassword = '';

  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return response.status(201).json({
      status: 'Success',
      token,
      data: newUser,
    });
  }
};
