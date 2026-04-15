import express from "express";
const router = express.Router();

import { register, login, savePushToken } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

router.post('/register', register);
router.post('/login', login);
router.post('/push-token', protect, savePushToken);

export default router;
