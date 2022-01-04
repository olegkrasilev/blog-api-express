import crypto from 'crypto';

import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '@src/models/entities/User';

export const resetPassword = async (request: Request, response: Response, next: NextFunction) => {
  // 1) Get user based on the token
  const resetToken = request.params.token;

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await User.findOne({ passwordResetToken: hashedToken });

  // TODO duplicated code
  if (!user) {
    return response.status(400).json({
      status: 'fail',
      data: 'This user does not exist',
    });
  }

  // 2) If token has not expired, and there is user, set the new resetPassword
  const now = new Date();
  const entityManager = getManager();
  const newPassword = request.body.password;
  const { id, passwordResetExpires } = user;
  const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

  if (passwordResetExpires > now) {
    user.encryptedPassword = newEncryptedPassword;
    // Subtract 1 second to make this condition work : isUserChangedPassword = JWTTimeStamp < changedTimeStamp;
    user.passwordChangedAt = new Date(now.getTime() - 1000);
    user.passwordResetExpires = now;
    user.passwordResetToken = '';
    await entityManager.save(user);
  }

  // 3) Update changedPassword property for the current user
  // 4) Log the user in, send the JWT
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return response.status(200).json({
      status: 'Success',
      token,
    });
  }

  next();
};
