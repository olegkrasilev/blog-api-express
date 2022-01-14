import express from 'express';

import { validateComment } from '@src/routes/validateCommentRoute';
import { postComment } from '@src/services/comment/postComment';
import { isAuth } from '@src/middleware/isAuth';
import { updateComment } from '@src/services/comment/updateComment';
import { deleteComment } from '@src/services/comment/deleteComment';

export const router = express.Router();

router.route('/postComment').post(isAuth, validateComment, postComment);
router.route('/updateComment').post(isAuth, validateComment, updateComment);
router.route('/deleteComment').delete(isAuth, deleteComment);
