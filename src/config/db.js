// src/config/db.js
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Needed for seeding
const Basket = require('../models/Basket'); // Import the model

const connectDB = async () => {
try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("✅ Connected");

    // THE NUCLEAR OPTION: Add this line here
    const result = await Basket.deleteMany({});
    console.log(`🧹 DELETED EVERYTHING: ${result.deletedCount} items removed from basket.`);

    // ... rest of your seeding logic
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;