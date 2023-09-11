import express from 'express';
import { isAuth } from '../middleware/index.js';
import { authControllers } from '../controllers/index.js';

const router = express.Router();

/**
 * Test a user
 * @method GET /api/auth
 * @access Private
 */
router.get('/', isAuth, authControllers.testAuth);

export default router;
