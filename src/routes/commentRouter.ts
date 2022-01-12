import express from 'express';

import { validateComment } from '@src/routes/validateCommentRoute';
import { postComment } from '@src/controllers/commentController/postComment';
import { isAuth } from '@src/middleware/isAuth';

export const router = express.Router();

router.route('/postComment').post(isAuth, validateComment, postComment);
