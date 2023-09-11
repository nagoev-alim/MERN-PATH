import express from 'express';
import { postControllers } from '../controllers/index.js';
import { isAuth } from '../middleware/index.js';

const router = express.Router();

/**
 * Create a new post
 * @method POST api/posts
 * @access Private
 */
router.post('/', isAuth, postControllers.create);

/**
 * Get all posts
 * @method GET api/posts
 * @access Private
 */
router.get('/', isAuth, postControllers.getAll);

/**
 * Get post by ID
 * @method GET api/posts/:id
 * @access Private
 */
router.get('/:id', isAuth, postControllers.getById);

/**
 * Delete a post
 * @method DELETE api/posts/:id
 * @access Private
 */
router.delete('/:id', isAuth, postControllers.delete);

/**
 * Like a post
 * @method PUT api/posts/like/:id
 * @access Private
 */
router.put('/like/:id', isAuth, postControllers.like);

/**
 * Dislike a post
 * @method PUT api/posts/dislike/:id
 * @access Private
 */
router.put('/dislike/:id', isAuth, postControllers.dislike);

/**
 * Add comment
 * @method POST api/posts/comment/:id
 * @access Private
 */
router.put('/comment/:id', isAuth, postControllers.addComment);

/**
 * Delete comment
 * @method DELETE api/posts/comment/:id/:comment_id
 * @access Private
 */
router.delete('/comment/:id/:comment_id', isAuth, postControllers.deleteComment);

export default router;
