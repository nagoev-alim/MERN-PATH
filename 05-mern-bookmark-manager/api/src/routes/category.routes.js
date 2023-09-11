import express from 'express';
import { categoryControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/categories
 */
router.post('/', checkAuthMiddleware, categoryControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/categories
 */
router.get('/', checkAuthMiddleware, categoryControllers.getDocuments);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/categories/:id
 */
router.get('/:id', checkAuthMiddleware, categoryControllers.getDocument);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/categories/:id
 */
router.put('/:id', checkAuthMiddleware, categoryControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/categories/:id
 */
router.delete('/:id', checkAuthMiddleware, categoryControllers.deleteDocument);

export default router;
