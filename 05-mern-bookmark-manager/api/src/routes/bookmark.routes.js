import express from 'express';
import { bookmarkControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/bookmarks
 */
router.post('/', checkAuthMiddleware, bookmarkControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/bookmarks
 */
router.get('/', checkAuthMiddleware, bookmarkControllers.getDocuments);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/bookmarks/:id
 */
router.put('/:id', checkAuthMiddleware, bookmarkControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/bookmarks/:id
 */
router.delete('/:id', checkAuthMiddleware, bookmarkControllers.deleteDocument);

export default router;
