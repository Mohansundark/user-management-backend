"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate requests using JWT.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const authMiddleware = (req, res, next) => {
    // Retrieve token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        next(); // Proceed to the next middleware/route handler
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};
exports.default = authMiddleware;
