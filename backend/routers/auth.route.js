import express from 'express';
const router = express.Router()
import * as authApiControllers from '../controllers/auth.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';

router.post('/signup', authApiControllers?.signup)
router.post('/signin', authApiControllers?.signin)
router.post('/signout', isAuthenticated, authApiControllers?.signout)

export default router;