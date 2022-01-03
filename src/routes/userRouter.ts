import { signup } from '@src/controllers/userController/signup';
import { updateUser } from '@src/controllers/userController';
import { getAllUsers } from '@src/controllers/userController/getAllUsers';
import { getUser } from '@src/controllers/userController/getUser';
import express from 'express';
import { check } from 'express-validator';
import { login } from '@src/controllers/userController/login';
import { forgotPassword } from '../controllers/userController/forgotPassword';
import { isAuth } from '../middleware/isAuth';

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
router.route('/:id').get(getUser).patch(updateUser);
router.route('/signup').post(validationChain, signup);
router.route('/login').post(validationChain, login);
router.route('/forgotPassword').post(forgotPassword);
