/**
 * Module for handling authentication routes.
 * @module routes/authRoutes
 */

import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { getUsers, getUserById } from '../controllers/userController';

/**
 * Router instance for handling authentication routes.
 * @type {Router}
 */
const router = Router();

/**
 * Registers a new user.
 *
 * @route POST /register
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/register', register);

/**
 * Authenticates a user.
 *
 * @route POST /login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/login', login);

/**
 * Retrieves a list of users.
 *
 * @route GET /users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/users', getUsers);

/**
 * Retrieves a specific user by ID.
 *
 * @route GET /users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.params.id - The ID of the user.
 */
router.get('/users/:id', getUserById);

export default router;


