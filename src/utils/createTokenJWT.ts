import jwt from 'jsonwebtoken';

import { Response } from 'express';

import { config } from '@src/config/config';

const { jwtSecret, jwtExpiresIn } = config.jwt;

const cookieOptions = {
  expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: false,
};

if (process.env.NODE_ENV === 'production') {
  cookieOptions.secure = true;
}

export const createAccessToken = (id: number, response?: Response) => {
  const token = jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });

  response?.cookie('jwt', token, cookieOptions);

  return token;
};
