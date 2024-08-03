import { Request, Response } from 'express';
import User from '../models/userModel';
import { successResponse, errorResponse } from '../utils/ResponseModel';

/**
 * Retrieves the profile of the authenticated user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;

    // Validate user ID
    if (!id) {
      return errorResponse(res, 'User ID is required', 400);
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse(res, 'Invalid user ID format', 400);
    }

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Send success response with user data
    successResponse(res, user, 'Profile retrieved successfully');
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Failed to retrieve profile', 500);
  }
};

/**
 * Updates the profile of the authenticated user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, bio } = req.body;
    const id = (req as any).user.id;

    // Validate input
    if (!name && !email && !bio) {
      return errorResponse(res, 'At least one field is required to update', 400);
    }

    // Validate user ID
    if (!id) {
      return errorResponse(res, 'User ID is required', 400);
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse(res, 'Invalid user ID format', 400);
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, bio },
      { new: true } // Return the updated user
    );

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Send success response with updated user data
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Failed to update profile', 500);
  }
};

/**
 * Retrieves a list of all users.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Find all users
      const users = await User.find();

    // Send success response with users data
    successResponse(res, users, 'Users retrieved successfully');
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Failed to retrieve users', 500);
  }
};

/**
 * Retrieves a specific user by ID.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate user ID
    if (!id) {
      return errorResponse(res, 'User ID is required', 400);
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse(res, 'Invalid user ID format', 400);
    }

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Send success response with user data
    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    // Handle exceptions
    console.error(error); // Log error details for debugging
    errorResponse(res, 'Failed to retrieve user', 500);
  }
};
