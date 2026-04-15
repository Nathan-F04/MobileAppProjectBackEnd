// src/routes/carRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
// Import the controller functions
const carController = require('../controllers/carController');


const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/', carController.getCars);
router.post('/', upload.single("image"), carController.createCar);
router.put('/:id', upload.single("image"), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;