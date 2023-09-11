import express from 'express';
import userRoutes from './user.routes.js';
import exerciseRoutes from './exercise.routes.js';

// 📋 Creating routes
const router = express.Router();

// 📋 Routes definitions
router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);

export default router;
