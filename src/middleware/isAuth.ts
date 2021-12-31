import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const isAuth = async (request: Request, response: Response, next: NextFunction) => {
  // Check the token
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

  // Validate token
  let decodedToken: JwtPayload | string | void;

  if (process.env.JWT_SECRET) {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET, error => {
      if (error) {
        return response.status(400).json({
          status: 'fail',
          data: 'Invalid Token. Please log in again!',
        });
      }
    });
  }

  // Check if user still exists

  // Check if user changed password after the JWT was issued
  next();
};
