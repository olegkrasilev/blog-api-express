import express from 'express';

import { getUserPosts } from '@src/services/post/getUserPosts';
import { getAllPosts } from '@src/services/post/getAllPosts';
import { updatePost } from '@src/services/post/updatePost';
import { validatePostAndTitle } from '@src/routes/validatePostsRoutes';
import { isAuth } from '@src/middleware/isAuth';
import { createPost } from '@src/services/post/createPost';
import { deletePost } from '@src/services/post/deletePost';

export const router = express.Router();

router.route('/createPost').post(isAuth, validatePostAndTitle, createPost);
router.route('/updatePost').patch(isAuth, validatePostAndTitle, updatePost);
router.route('/deletePost').delete(isAuth, deletePost);
router.route('/getAllPosts').get(isAuth, getAllPosts);
router.route('/getUserPosts').get(isAuth, getUserPosts);
