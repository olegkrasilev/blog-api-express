import express from 'express';

import { logout } from '@src/services/user/logout';
import {
  validateFirstLastNameEmail,
  validatePassword,
  validateEmailPassword,
  validateEmail,
  validationChain,
  validatePasswordAndNewPassword,
} from '@src/routes/validateUserRoutes';
import { isAuth } from '@src/middleware/isAuth';
import { updateUser } from '@src/services/user/updateUser';
import { forgotPassword } from '@src/services/user/forgotPassword';
import { getAllUsers } from '@src/services/user/getAllUsers';
import { getUser } from '@src/services/user/getUser';
import { login } from '@src/services/user/login';
import { resetPassword } from '@src/services/user/resetPassword';
import { signup } from '@src/services/user/signup';
import { updatePassword } from '@src/services/user/updatePassword';
import { deleteUser } from '@src/services/user/deleteUser';

export const router = express.Router();

router.route('/getAllUsers/:page').get(isAuth, getAllUsers);
router.route('/resetPassword/:token').patch(validatePassword, resetPassword);
router.route('/:id').get(isAuth, getUser);
router.route('/signup').post(validationChain, signup);
router.route('/login').post(validateEmailPassword, login);
router.route('/forgotPassword').post(validateEmail, forgotPassword);
router.route('/updatePassword').patch(isAuth, validatePasswordAndNewPassword, updatePassword);
router.route('/updateUser').patch(isAuth, validateFirstLastNameEmail, updateUser);
router.route('/deleteUser').delete(isAuth, deleteUser);
router.route('/logout').post(isAuth, logout);
