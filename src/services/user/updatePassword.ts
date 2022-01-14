import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';

import { createRefreshAccessToken } from '@src/utils/createTokenJWT';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';
import { RequestUser } from '@src/types';

export const updatePassword = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { userID, password, newPassword } = request.body;

  if (!(userID && password && newPassword)) {
    return next(new AppError('Please provide password and new Password', 400));
  }

  // 1) Get user from the collection
  const user = await User.findOne(userID);

  if (!user) {
    return next(new AppError('This user does not exist', 400));
  }

  const { encryptedPassword } = user;

  // 2) Check if the password is correct
  const isCurrentPasswordCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isCurrentPasswordCorrect) {
    return next(new AppError('Your current password is wrong', 400));
  }

  // 3) If the password is correct update the resetPassword
  const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

  await User.merge(user, { encryptedPassword: newEncryptedPassword }).save();

  // 4) Log the user in, send JWT
  const { refreshToken, accessToken } = createRefreshAccessToken(userID, response);

  return response.status(200).json({
    status: 'Success',
    refreshToken,
    accessToken,
  });
});
