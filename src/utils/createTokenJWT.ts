import jwt from 'jsonwebtoken';

import { Response } from 'express';

import { config } from '@src/config/config';

const { jwtAccessSecret, jwtAccessExpiresIn, jwtRefreshSecret, jwtRefreshExpiresIn } = config.jwt;

const cookieOptions = {
  expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: false,
};

if (process.env.NODE_ENV === 'production') {
  cookieOptions.secure = true;
}

export const createAccessToken = (id: number, response?: Response) => {
  const accessToken = jwt.sign({ id }, jwtAccessSecret, { expiresIn: jwtAccessExpiresIn });

  response?.cookie('jwt', accessToken, cookieOptions);

  return accessToken;
};

export const createRefreshToken = (id: number, response?: Response) => {
  const refreshToken = jwt.sign({ id }, jwtRefreshSecret, { expiresIn: jwtRefreshExpiresIn });

  response?.cookie('jwt', refreshToken, cookieOptions);

  return refreshToken;
};
