import express from 'express';

import { validatePostAndTitle } from '@src/routes/validatePostsRoutes';
import { isAuth } from '@src/middleware/isAuth';
import { createPost } from '@src/controllers/postController/createPost';

export const router = express.Router();

router.route('/createPost').post(isAuth, validatePostAndTitle, createPost);

// /createPost/user/postID
