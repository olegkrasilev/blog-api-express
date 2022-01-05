import express from 'express';
import { check } from 'express-validator';

import { isAuth } from '@src/middleware/isAuth';

import { updateUser } from '@src/controllers/userController/updateUser';

import { forgotPassword } from '@src/controllers/userController/forgotPassword';
import { getAllUsers } from '@src/controllers/userController/getAllUsers';
import { getUser } from '@src/controllers/userController/getUser';
import { login } from '@src/controllers/userController/login';
import { resetPassword } from '@src/controllers/userController/resetPassword';
import { signup } from '@src/controllers/userController/signup';
import { updatePassword } from '@src/controllers/userController/updatePassword';

export const router = express.Router();

const validationChain = [
  check('email', 'Please provide correct email').not().isEmpty().trim().toLowerCase().isEmail().normalizeEmail(),
  check('password', 'Set Minimum password length to at least a value of 6.')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 6 }),
];

router.route('/getAllUsers').get(isAuth, getAllUsers);
router.route('/resetPassword/:token').patch(validationChain, resetPassword);
router.route('/:id').get(getUser);
router.route('/signup').post(validationChain, signup);
router.route('/login').post(validationChain, login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/updatePassword').patch(isAuth, updatePassword);
router.route('/updateUser').patch(isAuth, updateUser);
