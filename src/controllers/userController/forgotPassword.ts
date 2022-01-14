import crypto from 'crypto';

import { Response, NextFunction } from 'express';

import { AppError } from '@src/utils/appError';
import { tryCatch } from '@src/utils/tryCatch';
import { RequestUser } from '@src/types/index';
import { User } from '@src/models/entities/User';
import { sendEmail } from '@src/utils/email';
import { validateRequest } from '@src/utils/express-validator';

export const forgotPassword = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email } = request.body;

  validateRequest(request, response);

  // 1) Get user based on Posted email
  const user = await User.findOne({ email });

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

  await User.merge(user, { passwordResetExpires, passwordResetToken }).save();

  // 3) Send it to user as email

  const resetURL = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password to: \n${resetURL}\n
  \n If you did not forget your password, please ignore this email`;

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
    await User.merge(user, { passwordResetExpires: '', passwordResetToken: '' }).save();

    return next(new AppError('There was an error sending the email, Try again later', 500));
  }
});
