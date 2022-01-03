import { User } from '@src/models/entities/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RequestUser } from '../types/index';

export const isAuth = async (request: RequestUser, response: Response, next: NextFunction) => {
  // Check the token
  // TODO moved into type file
  let token: string | undefined;

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
  // TODO moved into type file
  let decodedToken: JwtPayload | undefined;

  if (process.env.JWT_SECRET) {
    // TODO handle jwt error
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  }

  const decodedId = [decodedToken?.id];

  // Check if user still exists
  const freshUser = await User.findByIds(decodedId);

  if (freshUser.length === 0) {
    return response.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token does not longer exist',
    });
  }

  // Check if user changed password after the JWT was issued
  const JWTTimeStamp = decodedToken?.iat;

  const passwordChangedAt = freshUser[0].passwordChangedAt;
  const changedTimeStamp = Number.parseInt((passwordChangedAt.getTime() / 1000).toString(), 10);

  // TODO moved into type file
  let isUserChangedPassword: boolean | undefined;

  if (JWTTimeStamp) {
    isUserChangedPassword = JWTTimeStamp < changedTimeStamp;
  }

  console.log(JWTTimeStamp, changedTimeStamp);

  if (isUserChangedPassword) {
    return response.status(401).json({
      status: 'fail',
      message: 'User recently changed the password',
    });
  }

  next();
};