import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate requests using JWT.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    (req as any).user = decoded;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

export default authMiddleware;
