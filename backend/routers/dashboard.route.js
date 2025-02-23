import express from 'express';
const router = express.Router()
import * as dashboardApiControllers from '../controllers/dashboard.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';

router.get('/', isAuthenticated, dashboardApiControllers?.getScoreData)

export default router;