import crypto from 'crypto';

import { Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { validationResult } from 'express-validator';

import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';
import { sendEmail } from '@src/utils/email';

export const forgotPassword = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { email } = request.body;

  // Validate request for errors with Express-validator
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  // 1) Get user based on Posted email
  const user = await entityManager.findOne(User, { email });

  if (!user) {
    return next(new AppError('There is no user', 404));
  }

  // 2) Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Add 10 minutes to current time
  const now = new Date();
  const tenMinutes = 10 * 60_000;
  const passwordResetExpires = new Date(now.getTime() + tenMinutes);

  user.passwordResetExpires = passwordResetExpires;
  user.passwordResetToken = passwordResetToken;

  await entityManager.save(user);

  // 3) Send it to user as email

  const resetURL = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password to: \n${resetURL}\n
  \n If you did not forget your password, please ingore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    return response.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch {
    user.passwordResetToken = '';
    user.passwordResetExpires = '' as unknown as Date;
    await entityManager.save(user);

    return response.status(500).json({
      status: 'fail',
      message: 'There was an error sending the email, Try again later',
    });
  }
});
