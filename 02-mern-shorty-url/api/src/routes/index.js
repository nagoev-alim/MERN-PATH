import express from 'express';
import userRoutes from './user.routes.js';
import urlRoutes from './url.routes.js';
import temporaryRoutes from './temporary.routes.js';

// 📋 Creating routes
const router = express.Router();

// 📋 Routes definitions
router.use('/users', userRoutes);
router.use('/url', urlRoutes);
router.use('/', temporaryRoutes);

export default router;
