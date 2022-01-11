import crypto from 'crypto';

import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { createRefreshAccessToken } from '@src/utils/createTokenJWT';
import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { User } from '@src/models/entities/User';

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
  const entityManager = getManager();
  const newPassword = request.body.password;

  // Validate request for errors with Express-validator
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const { id, passwordResetExpires } = user;
  const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

  // 3) Update changedPassword property for the current user
  if (passwordResetExpires > now) {
    user.encryptedPassword = newEncryptedPassword;
    // Subtract 1 second to make this condition work : isUserChangedPassword = JWTTimeStamp < changedTimeStamp;
    user.passwordChangedAt = new Date(now.getTime() - 1000);
    user.passwordResetExpires = now;
    user.passwordResetToken = '';
    await entityManager.save(user);
  }

  if (now > passwordResetExpires) {
    return next(new AppError('Password reset time expired. Please try again', 400));
  }

  // 4) Log the user in, send the JWT
  const token = createRefreshAccessToken(id, response);

  return response.status(200).json({
    status: 'Success',
    token,
  });
});
