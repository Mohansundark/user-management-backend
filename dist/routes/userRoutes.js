"use strict";
/**
 * User routes module.
 * @module routes/userRoutes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
/**
 * Express router for user-related routes.
 * @type {Router}
 */
const router = (0, express_1.Router)();
/**
 * Route to get user profile.
 * @name Get/profile
 * @route {GET} /profile
 * @memberof module:routes/userRoutes
 */
router.get('/profile', authMiddleware_1.default, userController_1.getProfile);
/**
 * Route to update user profile.
 * @name Put/profile/edit
 * @route {PUT} /profile/edit
 * @memberof module:routes/userRoutes
 */
router.put('/profile/edit', authMiddleware_1.default, userController_1.updateProfile);
exports.default = router;
