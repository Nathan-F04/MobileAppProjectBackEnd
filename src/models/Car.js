// src/models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  licensePlate: { type: String, required: true },
  year: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // Store Base64 string here
});

// Important: module.exports
module.exports = mongoose.model("Car", carSchema);
