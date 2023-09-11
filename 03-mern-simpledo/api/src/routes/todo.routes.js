import express from 'express';
import { todoControllers } from '../controllers/index.js';
import { checkAuthMiddleware } from '../middleware/index.js';

// 📋 Creating routes
const router = express.Router();

/**
 * @description Get all documents
 * @access Private
 * @method GET /api/todo
 */
router.get('/', checkAuthMiddleware, todoControllers.get);

/**
 * @description Create new item
 * @access Private
 * @method POST /api/todo
 */
router.post('/', checkAuthMiddleware, todoControllers.create);

/**
 * @description Update document
 * @access Private
 * @method PUT /api/todo/:id
 */
router.put('/:id', checkAuthMiddleware, todoControllers.update);

/**
 * @description Delete document
 * @access Private
 * @method DELETE /api/todo/:id
 */
router.delete('/:id', checkAuthMiddleware, todoControllers.delete);


export default router;
