import express from "express";
const router = express.Router();
import * as promptController from "../controllers/promptController.js";

router.post('/estimate-price', promptController.getValue);

export default router;