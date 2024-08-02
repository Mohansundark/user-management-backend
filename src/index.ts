import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method,res.statusCode);
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/api', authRoutes);
app.use('/api/user',userRoutes);

//handle unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: 'Route not found' });
    
    next();
})
// Error Handling Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
