import { check } from 'express-validator';

export const validatePostTitle = check('title', 'Please provide correct title. Minimum length is 6')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape()
  .isLength({ min: 6 });

export const validatePost = check('post', 'Please provide correct post. Minimum length is 6 and max is 300')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape()
  .isLength({ min: 6, max: 300 });

export const validatePostAndTitle = [validatePostTitle, validatePost];
