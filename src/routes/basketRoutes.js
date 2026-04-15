import express from "express";
const router = express.Router();

import * as basketController from "../controllers/basketController.js";

// View basket for a user (GET /basket/:userId)
router.get('/:userId', basketController.getBasket);

// Add to basket (POST /basket/add)
router.post('/add', basketController.addToBasket);

// Remove from basket (DELETE /basket/remove) - reduces quantity or removes
router.delete('/remove', basketController.removeFromBasket);

module.exports = router;
