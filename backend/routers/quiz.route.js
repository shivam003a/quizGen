import express from 'express';
const router = express.Router()
import * as quizApiControllers from '../controllers/quiz.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';

router.post('/generate', isAuthenticated, quizApiControllers?.createQuiz)
router.get('/get-all', isAuthenticated, quizApiControllers?.getQuiz)
router.get('/get/:quizId', isAuthenticated, quizApiControllers?.getSingQuiz)
router.post('/submit', isAuthenticated, quizApiControllers?.submitQuizForFirstTime)
router.put('/submit', isAuthenticated, quizApiControllers?.submitQuizForMoreTime)

export default router;