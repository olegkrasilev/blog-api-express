import { User } from '@src/models/entities/User';
import { Response, NextFunction } from 'express';
import { RequestUser } from '@src/types/index';
import crypto from 'crypto';
import { getManager } from 'typeorm';

export const forgotPassword = async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { email } = request.body;

  // 1) Get user based on Posted email
  const user = await entityManager.findOne(User, { email });

  // TODO duplicated code
  if (!user) {
    return response.status(404).json({
      status: 'fail',
      data: 'There is no user',
    });
  }

  // 2) Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Added 10 minutes to current time
  const now = new Date();
  const tenMinutes = 10 * 60_000;
  const passwordResetExpires = new Date(now.getTime() + tenMinutes);

  user.passwordResetExpires = passwordResetExpires;
  user.passwordResetToken = passwordResetToken;

  await entityManager.save(user);

  // 3) Send it to user as email
};
