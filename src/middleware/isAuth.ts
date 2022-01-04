import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { User } from '@src/models/entities/User';
import { IsUserChangedPassword, DecodedToken, Token } from '@src/types/index';

export const isAuth = async (request: Request, response: Response, next: NextFunction) => {
  // Check the token
  let token: Token;
  let isUserChangedPassword: IsUserChangedPassword;
  let decodedToken: DecodedToken;

  if (request.headers.authorization?.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return response.status(401).json({
      status: 'fail',
      data: 'You are not logged in! Please log in to get access!',
    });
  }

  // Verification token

  if (process.env.JWT_SECRET) {
    // TODO handle jwt error
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  }

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
  // TODO Move to type file
  let changedTimeStamp: number | undefined;

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
};
