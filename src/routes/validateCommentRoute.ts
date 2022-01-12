import { check } from 'express-validator';

export const validateComment = check('comment', 'Please provide correct comment.')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape();
