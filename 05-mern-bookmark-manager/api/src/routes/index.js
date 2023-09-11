import express from 'express';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import bookmarkRoutes from './bookmark.routes.js';

// 📋 Creating routes
const router = express.Router();

// 📋 Routes definitions
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/bookmarks', bookmarkRoutes);

export default router;
