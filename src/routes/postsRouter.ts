import express from 'express';

import { isAuth } from '@src/middleware/isAuth';
import { createPost } from '@src/controllers/postController/createPost';

export const router = express.Router();

router.route('/createPost').post(isAuth, createPost);

// /createPost/user/postID
