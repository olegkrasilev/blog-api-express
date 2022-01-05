import { NextFunction, Request, Response } from 'express';

export const tryCatch = (function_: any) => (request: Request, response: Response, next: NextFunction) => {
  function_(request, response, next).catch(next);
};
