import { NextFunction, Response } from 'express';

import { RequestUser } from '@src/types/index';
import { tryCatch } from '@src/utils/tryCatch';

export const logout = tryCatch(async (request: RequestUser, response: Response, next: NextFunction) => {
  response.clearCookie('jwtAccessToken');
  response.clearCookie('jwtRefreshToken');

  return response.status(204).json({
    status: 'success',
  });
});
