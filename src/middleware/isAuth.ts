import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { tryCatch } from '@src/utils/tryCatch';
import { AppError } from '@src/utils/appError';
import { config } from '@src/config/config';
import { DecodedToken, Token } from '@src/types/index';
import { createNewAccessToken } from '@src/utils/createTokenJWT';

export const isAuth = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  // Check the token
  let accessToken: Token;
  let refreshToken: Token;
  let decodedAccessToken: DecodedToken;
  let decodedRefreshToken: DecodedToken;

  const { jwtAccessSecret, jwtRefreshSecret } = config.jwt;

  if (request.headers.authorization?.startsWith('Bearer')) {
    accessToken = request.headers.authorization.split(' ')[1];
  }

  if (request.cookies.jwtAccessToken && request.cookies.jwtRefreshToken) {
    accessToken = request.cookies.jwtAccessToken;
    refreshToken = request.cookies.jwtRefreshToken;
  }

  if (!(accessToken && refreshToken)) {
    return next(new AppError('You are not logged in! Please log in to get access!', 401));
  }

  // Verification token
  try {
    decodedAccessToken = jwt.verify(accessToken, jwtAccessSecret) as JwtPayload;

    return next();
  } catch (error) {
    console.error(error);
  }

  if (!decodedAccessToken) {
    try {
      decodedRefreshToken = jwt.verify(refreshToken, jwtRefreshSecret) as JwtPayload;
    } catch (error) {
      console.error(error);
    }
  }

  if (!decodedRefreshToken) {
    return next(new AppError('You are not logged in! Please log in to get access!', 401));
  }

  accessToken = createNewAccessToken(Number(decodedRefreshToken.id), response);

  return next();
});
