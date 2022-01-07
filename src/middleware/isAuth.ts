import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { tryCatch } from '../utils/tryCatch';

import { config } from '@src/config/config';
import { User } from '@src/models/entities/User';
import { IsUserChangedPassword, DecodedToken, Token, ChangedTimeStamp } from '@src/types/index';

export const isAuth = tryCatch(async (request: Request, response: Response, next: NextFunction) => {
  // Check the token
  let token: Token;
  let isUserChangedPassword: IsUserChangedPassword;
  let changedTimeStamp: ChangedTimeStamp;

  const { jwtAccessSecret } = config.jwt;

  if (request.headers.authorization?.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  }

  if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }

  if (!token) {
    return response.status(401).json({
      status: 'fail',
      data: 'You are not logged in! Please log in to get access!',
    });
  }

  // Verification token
  const decodedToken: DecodedToken = jwt.verify(token, jwtAccessSecret) as JwtPayload;

  const decodedId = [decodedToken?.id];

  // Check if user still exists
  const isUserExists = await User.findByIds(decodedId);

  if (isUserExists.length === 0) {
    return response.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token does not longer exist',
    });
  }

  // Check if user changed password after the JWT was issued
  const JWTTimeStamp = decodedToken?.iat;

  const passwordChangedAt = isUserExists[0].passwordChangedAt;

  if (passwordChangedAt) {
    changedTimeStamp = Number.parseInt((passwordChangedAt.getTime() / 1000).toString(), 10);
  }

  if (JWTTimeStamp && changedTimeStamp) {
    isUserChangedPassword = JWTTimeStamp < changedTimeStamp;
  }

  if (isUserChangedPassword) {
    return response.status(401).json({
      status: 'fail',
      message: 'User recently changed the password',
    });
  }

  return next();
});
