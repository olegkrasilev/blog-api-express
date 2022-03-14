import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { addMinutes, addDays } from 'date-fns';

import { config } from '@src/config/config';

const {
  jwtAccessSecret,
  jwtAccessExpiresIn,
  jwtRefreshSecret,
  jwtRefreshExpiresIn,
  jwtCookieAccessExpiresIn,
  jwtCookieRefreshExpiresIn,
} = config.jwt;

const cookieAccessOptions = {
  expires: addMinutes(new Date(), Number(jwtCookieAccessExpiresIn)),
  httpOnly: true,
  secure: false,
};

const cookieRefreshOptions = {
  expires: addDays(new Date(), Number(jwtCookieRefreshExpiresIn)),
  httpOnly: true,
  secure: false,
};

if (process.env.NODE_ENV === 'production') {
  cookieAccessOptions.secure = true;
  cookieRefreshOptions.secure = true;
}

export const createRefreshAccessToken = (id: number, response: Response) => {
  const accessToken = jwt.sign({ id }, jwtAccessSecret, { expiresIn: jwtAccessExpiresIn });
  const refreshToken = jwt.sign({ id }, jwtRefreshSecret, { expiresIn: jwtRefreshExpiresIn });

  response.cookie('jwtAccessToken', accessToken, cookieAccessOptions);
  response.cookie('jwtRefreshToken', refreshToken, cookieRefreshOptions);

  return { refreshToken, accessToken };
};

export const createNewAccessToken = (id: number, response: Response) => {
  const accessToken = jwt.sign({ id }, jwtAccessSecret, { expiresIn: jwtAccessExpiresIn });

  response.cookie('jwtAccessToken', accessToken, cookieAccessOptions);

  return accessToken;
};
