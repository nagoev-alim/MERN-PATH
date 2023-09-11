import express from 'express';
import { userControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Register user
 * @access Private
 * @method POST /
 */
router.post('/register', userControllers.register);

/**
 * @description Login user
 * @access Public
 * @method POST /
 */
router.post('/login', userControllers.login);

/**
 * @description Refresh token
 * @access Public
 * @method POST /refresh
 */
router.post('/refresh', userControllers.refresh);

/**
 * @description Get user
 * @access Private
 * @method GET /
 */
router.get('/', checkAuthMiddleware, userControllers.get);

/**
 * @description Update user
 * @access Private
 * @method PUT /
 */
router.put('/', checkAuthMiddleware, userControllers.update);

export default router;
