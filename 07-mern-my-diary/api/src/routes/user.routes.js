// 🔳 Imports packages
import express from 'express';
// 🔳 Custom import
import { userControllers } from '../controllers/index.js';
import { checkAuthCookieMiddleware } from '../middlewares/index.js';

// 🟥 Creating routes
const router = express.Router();

// 🟥 Routes definitions
/**
 * @description Register user
 * @access Private
 * @method POST /api/users/register
 */
router.post('/register', userControllers.registerUser);

/**
 * @description Register user with verified email
 * @access Private
 * @method POST /api/users/register
 */
// router.post('/register', userControllers.registerWithVerifiedEmail);

/**
 * @description Login user
 * @access Public
 * @method POST /api/users/login
 */
router.post('/login', userControllers.loginUser);

/**
 * @description Login user with verified email
 * @access Public
 * @method POST /api/users/login
 */
// router.post('/login', userControllers.loginWithVerifiedEmail);

/**
 * @description Logout user
 * @access Public
 * @method Get /api/users/logout
 */
router.post('/logout', checkAuthCookieMiddleware, userControllers.logoutUser);

/**
 * @description Get user
 * @access Private
 * @method GET /api/users
 */
router.get('/', checkAuthCookieMiddleware, userControllers.readUser);

/**
 * @description Update user
 * @access Private
 * @method PUT /api/users
 */
router.put('/', checkAuthCookieMiddleware, userControllers.updateUser);

/**
 * @description Delete user
 * @access Private
 * @method DELETE /api/users
 */
router.delete('/', checkAuthCookieMiddleware, userControllers.deleteUser);

/**
 * @description Refresh token
 * @access Public
 * @method POST /api/users/refresh
 */
router.post('/refresh', userControllers.refreshToken);

/**
 * @description Verify user
 * @access Public
 * @method Get /api/users/verify/:token
 */
router.get('/verify/:token', userControllers.verifyUser);


export default router;
