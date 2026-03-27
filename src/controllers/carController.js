// src/controllers/carController.js
const Car = require('../models/Car'); // Import the model!

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
    const { name, price, description, image } = req.body; // include image support, new atts
    const newCar = await Car.create({ name, price, description, image }); //new atts
    res.status(201).json({ message: 'Car added successfully!', car: newCar });
  } catch (err) {
    res.status(500).json({ message: 'Error adding car', error: err.message });
  }
};

// UPDATE a car
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCar = await Car.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car updated', car: updatedCar });
  } catch (err) {
    res.status(500).json({ message: 'Error updating car', error: err.message });
  }
};

// DELETE a car
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted', product: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};