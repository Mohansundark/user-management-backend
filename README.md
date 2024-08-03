# User Management System - Backend

This is the backend application for the User Management System. It provides an API for user authentication and management.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine.
- MongoDB installed and running on your machine or access to a MongoDB Atlas cluster.

## Getting Started

Follow the steps below to set up and run the backend application:

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Mohansundark/user-management-backend.git
```

### 2. Navigate to the Project Directory

Go to the project directory:

```bash
cd user-management-backend
```

### 3. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the necessary environment variables. Example:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Replace `<your-mongodb-uri>` and `<your-jwt-secret>` with your actual MongoDB URI and JWT secret.

### 5. Start the Development Server

Run the following command to start the development server:

```bash
npm start
```

The application will be accessible at `http://localhost:5000`.

## API Endpoints

The backend application provides the following API endpoints:

### Authentication Routes

- **POST `/register`**: Registers a new user.
  - Request Body: `{ "name": "string", "email": "string", "password": "string" , "confrimPassword":"string" }`
  
- **POST `/login`**: Authenticates a user.
  - Request Body: `{ "email": "string", "password": "string" }`

### User Routes

- **GET `/profile`**: Retrieves the authenticated user's profile.
  - Headers: `{ "Authorization": "Bearer <token>" }`
    
- **PUT `/profile/edit`**: Updates the authenticated user's profile.
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Request Body: `{ "name": "string", "email": "string" }`
 
- **GET `/users`**: Retrieves a list of users.
 
- **GET `/users/:id`**: Retrieves a specific user by ID.
  - Params: `{ "id": "string" }`
 
## Project Structure
- `src/index.ts`: Contains the Express Application.
- `src/config.ts`: Contains Mongodb configurations.
- `src/routes/userRoutes.js`: Contains routes related to user profile management.
- `src/routes/authRoutes.js`: Contains routes related to user authentication.
- `src/controllers/userController.js`: Contains the logic for handling user-related requests.
- `src/controllers/authController.js`: Contains the logic for handling authentication requests.
- `src/middlewares/authMiddleware.js`: Middleware for authenticating JWT tokens.
- `src/models/userModel.ts`: Contains User model definition with password validation.
- `src/utils/Responsemodel.ts`: Contains the format for reponse/error message. 
