// 🔳 Imports packages
import express from 'express';
// 🔳 Custom imports
import userRoutes from './user.routes.js';
import diaryRoutes from './diary.routes.js';

// 🟥 Creating routes
const router = express.Router();

// 🟥 Routes definitions
router.use('/users', userRoutes);
router.use('/diary', diaryRoutes);

export default router;
