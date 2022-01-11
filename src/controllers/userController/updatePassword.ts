import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import { getManager } from 'typeorm';

import { createRefreshAccessToken } from '@src/utils/createTokenJWT';
import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { User } from '@src/models/entities/User';
import { RequestUser } from '@src/types';

export const updatePassword = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { id, password, newPassword } = request.body;

  if (!(id && password && newPassword)) {
    return next(new AppError('Please provide password and new Password', 400));
  }

  // 1) Get user from the collection
  const [user] = await User.findByIds([id]);

  const encryptedPassword = user.encryptedPassword;

  // 2) Check if the password is correct
  const isCurrentPasswordCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isCurrentPasswordCorrect) {
    return next(new AppError('Your current password is wrong', 400));
  }

  // 3) If the password is correct update the resetPassword
  const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

  user.encryptedPassword = newEncryptedPassword;
  await entityManager.save(user);

  // 4) Log the user in, send JWT
  const token = createRefreshAccessToken(id, response);

  return response.status(200).json({
    status: 'Success',
    token,
  });
});
