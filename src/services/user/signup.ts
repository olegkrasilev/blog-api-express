import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';

import { createRefreshAccessToken } from '@src/utils/createTokenJWT';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';
import { RequestUser } from '@src/types/index';
import { validateRequest } from '@src/utils/express-validator';

export const signup = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = request.body;

  // Validate user input

  if (!(email && password && firstName && lastName)) {
    return next(new AppError('All input is required: email, password, firstName, lastName', 400));
  }

  validateRequest(request, response);

  //  Check if this user exits
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return next(new AppError('This user already exist', 409));
  }

  //  Encrypt password and create user

  const encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    firstName,
    lastName,
    encryptedPassword,
  }).save();

  const { refreshToken, accessToken } = createRefreshAccessToken(newUser.id, response);

  return response.status(201).json({
    status: 'Success',
    id: newUser.id,
    email,
    password,
    firstName,
    lastName,
    accessToken,
    refreshToken,
  });
});
