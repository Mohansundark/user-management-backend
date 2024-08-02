"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.updateProfile = exports.getProfile = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const ResponseModel_1 = require("../utils/ResponseModel");
/**
 * Retrieves the profile of the authenticated user.
 * @param req - Express request object
 * @param res - Express response object
 */
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        // Validate user ID
        if (!id) {
            return (0, ResponseModel_1.errorResponse)(res, 'User ID is required', 400);
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid user ID format', 400);
        }
        // Find user by ID
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return (0, ResponseModel_1.errorResponse)(res, 'User not found', 404);
        }
        // Send success response with user data
        (0, ResponseModel_1.successResponse)(res, user, 'Profile retrieved successfully');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Failed to retrieve profile', 500);
    }
});
exports.getProfile = getProfile;
/**
 * Updates the profile of the authenticated user.
 * @param req - Express request object
 * @param res - Express response object
 */
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, bio } = req.body;
        const id = req.user.id;
        // Validate input
        if (!name && !email && !bio) {
            return (0, ResponseModel_1.errorResponse)(res, 'At least one field is required to update', 400);
        }
        // Validate user ID
        if (!id) {
            return (0, ResponseModel_1.errorResponse)(res, 'User ID is required', 400);
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid user ID format', 400);
        }
        // Update user profile
        const user = yield userModel_1.default.findByIdAndUpdate(id, { name, email, bio }, { new: true } // Return the updated user
        );
        if (!user) {
            return (0, ResponseModel_1.errorResponse)(res, 'User not found', 404);
        }
        // Send success response with updated user data
        (0, ResponseModel_1.successResponse)(res, user, 'Profile updated successfully');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Failed to update profile', 500);
    }
});
exports.updateProfile = updateProfile;
/**
 * Retrieves a list of all users.
 * @param req - Express request object
 * @param res - Express response object
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all users
        const users = yield userModel_1.default.find();
        // Send success response with users data
        (0, ResponseModel_1.successResponse)(res, users, 'Users retrieved successfully');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Failed to retrieve users', 500);
    }
});
exports.getUsers = getUsers;
/**
 * Retrieves a specific user by ID.
 * @param req - Express request object
 * @param res - Express response object
 */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Validate user ID
        if (!id) {
            return (0, ResponseModel_1.errorResponse)(res, 'User ID is required', 400);
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid user ID format', 400);
        }
        // Find user by ID
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return (0, ResponseModel_1.errorResponse)(res, 'User not found', 404);
        }
        // Send success response with user data
        (0, ResponseModel_1.successResponse)(res, user, 'User retrieved successfully');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Failed to retrieve user', 500);
    }
});
exports.getUserById = getUserById;
