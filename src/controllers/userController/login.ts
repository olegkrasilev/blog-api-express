import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { createAccessToken } from '@src/utils/createTokenJWT';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';

export const login = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  if (!(email && password)) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Validate request for errors with Express-validator
  // 1) Check if email and password exist
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  // 2) Check if the user exist
  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    return next(new AppError('This user does not exist', 404));
  }

  const { encryptedPassword } = isUserExists;
  const { id } = isUserExists;

  // 3) Check if user exist && password is correct
  const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isUserExists || !isPasswordCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) Send jwt to client
  const token = createAccessToken(id);

  return response.status(200).json({
    status: 'Success',
    token,
  });
});
