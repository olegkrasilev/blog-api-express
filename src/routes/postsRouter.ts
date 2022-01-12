import express from 'express';

import { getUserPosts } from '@src/controllers/postController/getUserPosts';
import { getAllPosts } from '@src/controllers/postController/getAllPosts';
import { updatePost } from '@src/controllers/postController/updatePost';
import { validatePostAndTitle } from '@src/routes/validatePostsRoutes';
import { isAuth } from '@src/middleware/isAuth';
import { createPost } from '@src/controllers/postController/createPost';
import { deletePost } from '@src/controllers/postController/deletePost';

export const router = express.Router();

router.route('/createPost').post(isAuth, validatePostAndTitle, createPost);
router.route('/updatePost').patch(isAuth, validatePostAndTitle, updatePost);
router.route('/deletePost').delete(isAuth, deletePost);
router.route('/getAllPosts').get(isAuth, getAllPosts);
router.route('/getUserPosts').get(isAuth, getUserPosts);
