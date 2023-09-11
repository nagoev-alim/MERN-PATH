import express from 'express';
import usersRoutes from './users.routes.js';
import profileRoutes from './profile.routes.js';
import postsRoutes from './posts.routes.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/profile', profileRoutes);
router.use('/posts', postsRoutes);

export default router;
