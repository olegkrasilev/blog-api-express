import crypto from 'crypto';

import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';
import { validateRequest } from '@src/utils/express-validator';

export const resetPassword = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  // 1) Get user based on the token
  const resetToken = request.params.token;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashedToken });

  if (!user) {
    return next(new AppError('This user does not exist', 404));
  }

  // 2) If token has not expired, and there is user, set the new resetPassword
  const now = new Date();
  const newPassword = request.body.password;

  validateRequest(request, response);

  const { passwordResetExpires } = user;
  const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

  // 3) Update changedPassword property for the current user
  if (passwordResetExpires > now) {
    await User.merge(user, {
      encryptedPassword: newEncryptedPassword,
      passwordChangedAt: now,
      passwordResetExpires: now,
      passwordResetToken: '',
    }).save();
  }

  if (now > passwordResetExpires) {
    return next(new AppError('Password reset time expired. Please try again', 400));
  }

  // 4) Clear jwt and login with new password

  response.clearCookie('jwtAccessToken');
  response.clearCookie('jwtRefreshToken');

  return response.status(204).json({
    status: 'success',
  });
});
