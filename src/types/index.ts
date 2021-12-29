import { Request } from 'express';

export interface RequestUser extends Request {
  body: {
    email: string | undefined;
    password: string | undefined;
  };
}
