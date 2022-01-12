import express from 'express';

import { postComment } from '@src/controllers/commentController/postComment';
import { isAuth } from '@src/middleware/isAuth';

export const router = express.Router();

router.route('/postComment').post(isAuth, postComment);
