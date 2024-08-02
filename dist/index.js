"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, config_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method, res.statusCode);
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
//handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
    next();
});
// Error Handling Middleware
app.use(errorMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
