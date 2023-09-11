import express from 'express';
import { exerciseControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/exercises
 */
router.post('/', checkAuthMiddleware, exerciseControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/exercises
 */
router.get('/', checkAuthMiddleware, exerciseControllers.getDocuments);

/**
 * @description Get single document
 * @access Private
 * @method GET /api/exercises/:id
 */
router.get('/:id', checkAuthMiddleware, exerciseControllers.getDocument);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/exercises/:id
 */
router.put('/:id', checkAuthMiddleware, exerciseControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/exercises/:id
 */
router.delete('/:id', checkAuthMiddleware, exerciseControllers.deleteDocument);

export default router;
