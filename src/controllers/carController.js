// src/controllers/carController.js
const Car = require("../models/Car"); // Import the model
import { uploadImage } from "../services/s3Service.js";

// READ all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};

// CREATE a new car
exports.createCar = async (req, res) => {
  try {
    let imageData = null;

    if (req.file) {
      imageData = await uploadImage(req.file);
    }

    const { model, licensePlate, year, price, description } = req.body; // include image support
    const newCar = await Car.create({
      model,
      licensePlate,
      year: Number(year),
      price: Number(price),
      description,
      imageUrl: imageData?.url,
      imageKey: imageData?.key,
    });
    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (err) {
    res.status(500).json({ message: "Error adding car", error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const { model, licensePlate, year, price, description } = req.body;

    if (model !== undefined) car.model = model;
    if (licensePlate !== undefined) car.licensePlate = licensePlate;
    if (year !== undefined) car.year = Number(year);
    if (price !== undefined) car.price = Number(price);
    if (description !== undefined) car.description = description;

    if (req.file) {
      // delete old image
      if (car.imageKey) {
        await deleteImage(car.imageKey);
      }

      const newImage = await uploadImage(req.file);
      car.imageUrl = newImage.url;
      car.imageKey = newImage.key;
    }

    const updatedCar = await car.save();

    res.json({
      message: "Car updated",
      car: updatedCar,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error updating car",
      error: err.message,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.imageKey) {
      await deleteImage(car.imageKey);
    }

    await Car.findByIdAndDelete(id);

    res.json({
      message: "Car deleted successfully",
      car,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error deleting car",
      error: err.message,
    });
  }
};