import express from 'express';

import { validateComment } from '@src/routes/validateCommentRoute';
import { postComment } from '@src/controllers/commentController/postComment';
import { isAuth } from '@src/middleware/isAuth';
import { updateComment } from '@src/controllers/commentController/updateComment';

export const router = express.Router();

router.route('/postComment').post(isAuth, validateComment, postComment);
router.route('/updateComment').post(isAuth, validateComment, updateComment);
