// src/models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  licensePlate: { type: String, required: true },
  year: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  imageKey: { type: String },
});

const Car = mongoose.model("Car", carSchema);

export default Car;