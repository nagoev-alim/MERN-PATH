// 🔳 Imports packages
import express from 'express';
// 🔳 Custom imports
import { diaryControllers } from '../controllers/index.js';
import { checkAuthCookieMiddleware } from '../middlewares/index.js';

// 🟥 Creating routes
const router = express.Router();

// 🟥 Apply middlewares
router.use(checkAuthCookieMiddleware);

// 🟥 Routes definitions
/**
 * @description Create diary
 * @access Private
 * @method POST /api/diary
 */
router.post('/', diaryControllers.createDiary);

/**
 * @description Get all diaries
 * @access Private
 * @method GET /api/diary
 */
router.get('/', diaryControllers.getDiaries);

/**
 * @description Get single diary
 * @access Private
 * @method GET /api/diary/:id
 */
router.get('/:id', diaryControllers.getDiary);

/**
 * @description Update single diary
 * @access Private
 * @method PUT /api/diary/:id
 */
router.put('/:id', diaryControllers.updateDiary);

/**
 * @description Delete single diary
 * @access Private
 * @method DELETE /api/diary/:id
 */
router.delete('/:id', diaryControllers.deleteDiary);

export default router;
