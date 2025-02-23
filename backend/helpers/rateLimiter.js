import { rateLimit } from 'express-rate-limit'

// RateLimit Callback
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: {
        success: false,
        message: "Too many request. Please try later...",
        response: null
    }
})
export const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many signup attempts. Please try later...",
        response: null
    }
})
export const signinLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many signin attempts. Please try later...",
        response: null
    }
})
export const quizGenerateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1,
    message: {
        success: false,
        message: "Too many quiz generation attempts. Please try later...",
        response: null
    }
})