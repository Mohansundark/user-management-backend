/**
 * User routes module.
 * @module routes/userRoutes
 */

import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

/**
 * Express router for user-related routes.
 * @type {Router}
 */
const router = Router();

/**
 * Route to get user profile.
 * @name Get/profile
 * @route {GET} /profile
 * @memberof module:routes/userRoutes
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * Route to update user profile.
 * @name Put/profile/edit
 * @route {PUT} /profile/edit
 * @memberof module:routes/userRoutes
 */
router.put('/profile/edit', authMiddleware, updateProfile);

export default router;


