import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestUser extends Request {
  body: {
    email: string | undefined;
    password: string | undefined;
    id: number | undefined;
    newPassword: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    post: string | undefined;
    title: string | undefined;
    comment: string | undefined;
    userID: number | undefined;
    postID: number | undefined;
    commentID: number | undefined;
  };
  params: {
    id?: string;
  };
}

export type Token = string | undefined;

export type DecodedToken = JwtPayload | undefined;

export type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};
