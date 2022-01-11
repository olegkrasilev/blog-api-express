import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

import { createRefreshAccessToken } from '../../utils/createTokenJWT';

import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';
import { RequestUser } from '@src/types/index';

export const signup = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = request.body;

  // Validate user input

  if (!(email && password && firstName && lastName)) {
    return next(new AppError('All input is required: email, password, firstName, lastName', 400));
  }

  // Validate request for errors with Express-validator

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
    return next(new AppError('This user already exist', 409));
  }

  //  Encrypt password and create user

  const encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = User.create({
    email,
    firstName,
    lastName,
    encryptedPassword,
  });

  await newUser.save();

  const accessToken = createRefreshAccessToken(newUser.id, response);

  return response.status(201).json({
    status: 'Success',
    accessToken,
    data: {
      id: newUser.id,
      email,
      password,
      firstName,
      lastName,
    },
  });
});
