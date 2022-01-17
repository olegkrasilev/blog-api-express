import { validationResult } from 'express-validator';
import { Response, Request } from 'express';

import { RequestUser } from '@src/types/index';

/**
 * @description Validate request for errors with Express-validator. For validation details check routes folder.
 * @param  {Request|RequestUser} request
 * @param  {Response} response
 * @returns Response<any, Record<string, any>> | null
 */

export const validateRequest = (request: Request | RequestUser, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  return null;
};
