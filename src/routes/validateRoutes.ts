import { check } from 'express-validator';

export const validateEmail = check('email', 'Please provide correct email')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape()
  .toLowerCase()
  .isEmail()
  .normalizeEmail();

export const validatePassword = check('password', 'Set Minimum password length to at least a value of 6.')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape()
  .isLength({ min: 6 });

export const validateNewPassword = check('newPassword', 'Set Minimum password length to at least a value of 6.')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape()
  .isLength({ min: 6 });

export const validateFirstName = check('firstName', 'Please provide correct first name')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape();

export const validateLastName = check('lastName', 'Please provide correct first name')
  .not()
  .isEmpty()
  .trim()
  .blacklist('\\[\\]')
  .escape();

export const validateEmailPassword = [validateEmail, validatePassword];

export const validateFirstLastNameEmail = [validateFirstName, validateLastName, validateEmail];

export const validatePasswordAndNewPassword = [validatePassword, validateNewPassword];

export const validationChain = [validateEmail, validateFirstName, validateLastName, validatePassword];
