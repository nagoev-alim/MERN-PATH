import express from 'express';
import { moviesControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/movies
 */
router.post('/', checkAuthMiddleware, moviesControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/movies
 */
router.get('/', checkAuthMiddleware, moviesControllers.getDocuments);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/movies/:id
 */
router.get('/:id', checkAuthMiddleware, moviesControllers.getDocument);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/movies/:id
 */
router.put('/:id', checkAuthMiddleware, moviesControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/movies/:id
 */
router.delete('/:id', checkAuthMiddleware, moviesControllers.deleteDocument);


export default router;
