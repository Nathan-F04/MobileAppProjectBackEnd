// src/models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  Model: { type: String, required: true },
  LicensePlate: { type: String, required: true },
  Year: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // Store Base64 string here
});

// Important: module.exports
module.exports = mongoose.model("Car", carSchema);
