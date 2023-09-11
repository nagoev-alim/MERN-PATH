import express from 'express';
import userRoutes from './user.routes.js';
import todoRoutes from './todo.routes.js';

// 📋 Creating routes
const router = express.Router();

// 📋 Routes definitions
router.use('/users', userRoutes);
router.use('/todo', todoRoutes);

export default router;
