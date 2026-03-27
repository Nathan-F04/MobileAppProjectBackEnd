// src/routes/carRoutes.js
const express = require('express');
const router = express.Router();
// Import the controller functions
const carController = require('../controllers/carController');

router.get('/', carController.getCars);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;