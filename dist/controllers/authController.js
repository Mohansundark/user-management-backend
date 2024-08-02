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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseModel_1 = require("../utils/ResponseModel");
/**
 * Registers a new user.
 * @param req - Express request object
 * @param res - Express response object
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        // Validate request body
        if (!name || !email || !password || !confirmPassword) {
            return (0, ResponseModel_1.errorResponse)(res, 'Missing required fields', 400);
        }
        if (password !== confirmPassword) {
            return (0, ResponseModel_1.errorResponse)(res, 'Passwords do not match', 400);
        }
        if (password.length < 8) {
            return (0, ResponseModel_1.errorResponse)(res, 'Password must be at least 8 characters', 400);
        }
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid email address', 400);
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', 400);
        }
        // Check if user already exists
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return (0, ResponseModel_1.errorResponse)(res, 'User already exists', 400);
        }
        // Create and save the new user
        const user = new userModel_1.default({ name, email, password });
        yield user.save();
        // Send success response
        (0, ResponseModel_1.successResponse)(res, user, 'User registered successfully');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Registration failed', 500);
    }
});
exports.register = register;
/**
 * Authenticates a user and returns a JWT token.
 * @param req - Express request object
 * @param res - Express response object
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate request body
        if (!email || !password) {
            return (0, ResponseModel_1.errorResponse)(res, 'Please provide email and password', 400);
        }
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid email address', 400);
        }
        // Check if user exists
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid email address', 400);
        }
        // Verify password
        if (!(yield user.comparePassword(password))) {
            return (0, ResponseModel_1.errorResponse)(res, 'Invalid password', 400);
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '2h' });
        // Send success response with token
        (0, ResponseModel_1.successResponse)(res, { token }, 'Login successful');
    }
    catch (error) {
        // Handle exceptions
        console.error(error); // Log error details for debugging
        (0, ResponseModel_1.errorResponse)(res, 'Login failed', 500);
    }
});
exports.login = login;
