// src/routes/carRoutes.js
import express from "express";
import multer from "multer";
const router = express.Router();

// Import the controller functions
import * as carController from "../controllers/carController.js";


const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/', carController.getCars);
router.post('/', upload.single("image"), carController.createCar);
router.put('/:id', upload.single("image"), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;