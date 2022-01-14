import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { createRefreshAccessToken } from '@src/utils/createTokenJWT';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';
import { validateRequest } from '@src/utils/express-validator';

export const login = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  if (!(email && password)) {
    return next(new AppError('Please provide email and password', 400));
  }

  validateRequest(request, response);

  // 2) Check if the user exist
  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    return next(new AppError('This user does not exist', 404));
  }

  const { encryptedPassword, id } = isUserExists;

  // 3) Check if user exist && password is correct
  const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isUserExists || !isPasswordCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) Send jwt to client
  const { accessToken, refreshToken } = createRefreshAccessToken(id, response);

  return response.status(200).json({
    status: 'Success',
    accessToken,
    refreshToken,
  });
});
