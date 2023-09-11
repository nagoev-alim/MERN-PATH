import express from 'express';
import { noteControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Create new item
 * @access Private
 * @method POST /api/notes
 */
router.post('/', checkAuthMiddleware, noteControllers.createDocument);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/notes
 */
router.get('/', checkAuthMiddleware, noteControllers.getDocuments);

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/notes/:id
 */
router.get('/:id', checkAuthMiddleware, noteControllers.getDocument);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/notes/:id
 */
router.put('/:id', checkAuthMiddleware, noteControllers.updateDocument);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/notes/:id
 */
router.delete('/:id', checkAuthMiddleware, noteControllers.deleteDocument);

export default router;
