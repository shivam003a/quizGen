// Dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js'
import authRoutes from './routers/auth.route.js'
import quizRoutes from './routers/quiz.route.js'
import dashboardRoutes from './routers/dashboard.route.js'
import * as limiter from './helpers/rateLimiter.js'

// Initializing Express
const app = express();

// MongoDB connection
connectDB();

// Configurinng env
dotenv.config()
const PORT = process.env.PORT || 5000;

// For express-rate-limit, to avoid rate limit as global is server is beyond reverse proxy
app.set("trust proxy", 1) // "1" trusts the first proxy (Render)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(limiter?.globalLimiter)

// Specific Route Limiter
// app.use('/api/auth/signup', limiter?.signupLimiter)
// app.use('/api/auth/signin', limiter?.signinLimiter)
// app.use('/api/quiz/generate', limiter?.quizGenerateLimiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true
    })
})

// Listening to server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})