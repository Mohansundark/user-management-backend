"use strict";
/**
 * Module for handling authentication routes.
 * @module routes/authRoutes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
/**
 * Router instance for handling authentication routes.
 * @type {Router}
 */
const router = (0, express_1.Router)();
/**
 * Registers a new user.
 *
 * @route POST /register
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/register', authController_1.register);
/**
 * Authenticates a user.
 *
 * @route POST /login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/login', authController_1.login);
/**
 * Retrieves a list of users.
 *
 * @route GET /users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/users', userController_1.getUsers);
/**
 * Retrieves a specific user by ID.
 *
 * @route GET /users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.params.id - The ID of the user.
 */
router.get('/users/:id', userController_1.getUserById);
exports.default = router;
