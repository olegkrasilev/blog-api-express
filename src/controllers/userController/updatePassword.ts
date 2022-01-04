import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';

import { User } from '@src/models/entities/User';
import { RequestUser } from '@src/types';

export const updatePassword = async (request: RequestUser, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { id, password, newPassword } = request.body;
  // 1) Get user from the collection
  const [user] = await User.findByIds([id]);

  console.log(id, user);

  const encryptedPassword = user.encryptedPassword;

  // 2) Check if the password is correct
  let isCurrentPasswordCorrect: boolean | undefined;

  if (password) {
    isCurrentPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
  }

  if (!isCurrentPasswordCorrect) {
    return response.status(400).json({
      status: 'fail',
      message: 'Your current password is wrong',
    });
  }

  // 3) If the password is correct update the resetPassword
  if (password && newPassword) {
    const newEncryptedPassword = await bcrypt.hash(newPassword, 12);

    user.encryptedPassword = newEncryptedPassword;
    await entityManager.save(user);
  }

  // 4) Log the user in, send JWT
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return response.status(200).json({
      status: 'Success',
      token,
    });
  }
};
