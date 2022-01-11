import express from 'express';

import { logout } from '../controllers/userController/logout';

import {
  validateFirstLastNameEmail,
  validatePassword,
  validateEmailPassword,
  validateEmail,
  validationChain,
  validatePasswordAndNewPassword,
} from '@src/routes/validateRoutes';

import { isAuth } from '@src/middleware/isAuth';
import { updateUser } from '@src/controllers/userController/updateUser';
import { forgotPassword } from '@src/controllers/userController/forgotPassword';
import { getAllUsers } from '@src/controllers/userController/getAllUsers';
import { getUser } from '@src/controllers/userController/getUser';
import { login } from '@src/controllers/userController/login';
import { resetPassword } from '@src/controllers/userController/resetPassword';
import { signup } from '@src/controllers/userController/signup';
import { updatePassword } from '@src/controllers/userController/updatePassword';
import { deleteUser } from '@src/controllers/userController/deleteUser';

export const router = express.Router();

router.route('/getAllUsers').get(isAuth, getAllUsers);
router.route('/resetPassword/:token').patch(validatePassword, resetPassword);
router.route('/:id').get(isAuth, getUser);
router.route('/signup').post(validationChain, signup);
router.route('/login').post(validateEmailPassword, login);
router.route('/forgotPassword').post(validateEmail, forgotPassword);
router.route('/updatePassword').patch(isAuth, validatePasswordAndNewPassword, updatePassword);
router.route('/updateUser').patch(isAuth, validateFirstLastNameEmail, updateUser);
router.route('/deleteUser').delete(isAuth, deleteUser);
router.route('/logout').post(isAuth, logout);
