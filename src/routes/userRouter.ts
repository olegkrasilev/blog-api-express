import { getAllUsers, getUser, updateUser } from '@src/controllers/userController';
import express from 'express';

export const router = express.Router();

router.route('/getAllUsers').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser);
