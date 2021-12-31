import { User } from '@src/models/entities/User';
import { Response, NextFunction } from 'express';
import { RequestUser } from '@src/types/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (request: RequestUser, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  // 1) Check if email and password exist
  // TODO Duplicated Code
  if (!(email && password)) {
    return response.status(400).json({
      status: 'fail',
      data: 'All input is required',
    });
  }

  // 2) Check if the user exist
  // TODO Duplicated Code
  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    return response.status(400).json({
      status: 'fail',
      data: 'This user does not exist',
    });
  }

  const { encryptedPassword } = isUserExists;
  const { id } = isUserExists;

  // 3) Check if user exist && password is correct
  const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isUserExists || !isPasswordCorrect) {
    return response.status(401).json({
      status: 'fail',
      data: 'Incorrect email or password',
    });
  }

  // 4) Send jwt to client
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return response.status(200).json({
      status: 'Success',
      token,
    });
  }
};
