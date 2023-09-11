import express from 'express';
import { profileControllers } from '../controllers/index.js';
import { isAuth } from '../middleware/index.js';

const router = express.Router();

/**
 * Get current user profile
 * @method GET /api/profile/me
 * @access Private
 */
router.get('/me', isAuth, profileControllers.me);

/**
 * Create or update user profile
 * @method POST /api/profile
 * @access Private
 */
router.post('/', isAuth, profileControllers.create);

/**
 * Get all profiles
 * @method GET /api/profile
 * @access Public
 */
router.get('/', profileControllers.getAll);

/**
 * Get profile by user ID
 * @method GET api/profile/user/:id
 * @access Public
 */
router.get('/user/:id', profileControllers.getByUserId);

/**
 * Delete profile, user & posts
 * @method DELETE api/profile
 * @access Private
 */
router.delete('/', isAuth, profileControllers.delete);

/**
 * Add profile experience
 * @method PUT api/profile/experience
 * @access Private
 */
router.put('/experience', isAuth, profileControllers.addExperience);

/**
 * Delete profile experience
 * @method DELETE api/profile/experience/:id
 * @access Private
 */
router.delete('/experience/:id', isAuth, profileControllers.deleteExperience);

/**
 * Add profile education
 * @method PUT api/profile/education
 * @access Private
 */
router.put('/education', isAuth, profileControllers.addEducation);

/**
 * Delete profile education
 * @method DELETE api/profile/education/:id
 * @access Private
 */
router.delete('/education/:id', isAuth, profileControllers.deleteEducation);

/**
 * Get user repos from GitHub
 * @method GET api/profile/github/:username
 * @access Public
 */
router.get('/github/:username', profileControllers.getRepos);

export default router;
