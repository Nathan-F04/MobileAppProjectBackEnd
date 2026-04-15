import express from "express";
const router = express.Router();
import * as statusController from "../controllers/statusController.js";

router.get('/api/status', statusController.getStatus);

module.exports = router;