import express from 'express';
import { temporaryControllers } from '../controllers/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Get document
 * @access Public
 * @method GET /api/:id
 */
router.get('/:id', temporaryControllers.get);

/**
 * @description Create new document
 * @access Public
 * @method POST /api
 */
router.post('/', temporaryControllers.create);

/**
 * @description Create new document
 * @access Public
 * @method DELETE /api
 */
router.delete('/:id', temporaryControllers.delete);

export default router;
