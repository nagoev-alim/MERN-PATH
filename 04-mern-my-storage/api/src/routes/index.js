import express from 'express';
import userRoutes from './user.routes.js';
import notesRoutes from './notes.routes.js';
import booksRoutes from './books.routes.js';
import moviesRoutes from './movies.routes.js';

// 📋 Creating routes
const router = express.Router();

// 📋 Routes definitions
router.use('/users', userRoutes);
router.use('/notes', notesRoutes);
router.use('/books', booksRoutes);
router.use('/movies', moviesRoutes);

export default router;
