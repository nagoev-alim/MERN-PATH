import express from 'express';
import { urlControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/url
 */
router.get('/', checkAuthMiddleware, urlControllers.getAll);

/**
 * @description Get document
 * @access Private
 * @method GET /api/url/:id
 */
router.get('/:id', urlControllers.getSingle);

/**
 * @description Create new item
 * @access Private
 * @method POST /api/url
 */
router.post('/', checkAuthMiddleware, urlControllers.create);

/**
 * @description Delete item
 * @access Private
 * @method DELETE /api/url/:id
 */
router.delete('/:id', checkAuthMiddleware, urlControllers.delete);


export default router;
