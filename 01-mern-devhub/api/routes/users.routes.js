import express from 'express';
import { usersControllers } from '../controllers/index.js';
import { isAuth } from '../middleware/index.js';

const router = express.Router();

/**
 * Register a new user
 * @method POST /api/users/register
 * @access Public
 */
router.post('/register',usersControllers.register);

/**
 * Login a user
 * @method POST /api/users/login
 * @access Public
 */
router.post('/login', usersControllers.login);

/**
 * Get a user
 * @method GET /api/users/
 * @access Private
 */
router.get('/', isAuth, usersControllers.getUser);


export default router;
