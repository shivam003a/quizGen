import express from 'express';
const router = express.Router()
import * as quizApiControllers from '../controllers/quiz.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';

router.post('/generate', isAuthenticated, quizApiControllers?.createQuiz)
router.get('/get-all', isAuthenticated, quizApiControllers?.getQuiz)

export default router;