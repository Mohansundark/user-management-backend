import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from '../utils/ResponseModel';

/**
 * Registers a new user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate request body
    if (!name || !email || !password || !confirmPassword) {
      return errorResponse(res, 'Missing required fields', 400);
    }

    if (password !== confirmPassword) {
      return errorResponse(res, 'Passwords do not match', 400);
    }

    if (password.length < 8) {
      return errorResponse(res, 'Password must be at least 8 characters', 400);
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return errorResponse(res, 'Invalid email address', 400);
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return errorResponse(res, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists', 400);
    }

    // Create and save the new user
    const user = new User({ name, email, password });
    await user.save();

    // Send success response
    successResponse(res, user, 'User registered successfully');
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Registration failed', 500);
  }
};

/**
 * Authenticates a user and returns a JWT token.
 * @param req - Express request object
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400);
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return errorResponse(res, 'Invalid email address', 400);
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 'Invalid email address', 400);
    }

    // Verify password
    if (!(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid password', 400);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '2h' });
    
    // Send success response with token
      successResponse(res, { token }, 'Login successful');
     
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Login failed', 500);
  }
};
