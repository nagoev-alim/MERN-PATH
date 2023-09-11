import express from 'express';
import { booksControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/books
 */
router.post('/', checkAuthMiddleware, booksControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/books
 */
router.get('/', checkAuthMiddleware, booksControllers.getDocuments);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/books/:id
 */
router.get('/:id', checkAuthMiddleware, booksControllers.getDocument);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/books/:id
 */
router.put('/:id', checkAuthMiddleware, booksControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/books/:id
 */
router.delete('/:id', checkAuthMiddleware, booksControllers.deleteDocument);

export default router;
