import { updateUser } from '@src/controllers/userController';
import { createUser } from '@src/controllers/userController/createUser';
import { getAllUsers } from '@src/controllers/userController/getAllUsers';
import { getUser } from '@src/controllers/userController/getUser';
import express from 'express';
import { check } from 'express-validator';

export const router = express.Router();

router.route('/getAllUsers').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser);
router.route('/register').post(
  [
    // @TODO Refactor this into function
    check('email', 'Please provide correct email').not().isEmpty().trim().toLowerCase().isEmail().normalizeEmail(),
    check('password', 'Set Minimum password length to at least a value of 6.')
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 6 }),
  ],
  createUser
);
