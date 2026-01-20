const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet'); // New security import
const cors = require('cors');     // FIX: You forgot to require cors
require('dotenv').config();

const app = express();

// Security and Middleware 
app.use(helmet());           // Protects against common web vulnerabilities
app.use(cors());             // Allows your mobile app to talk to this server [cite: 243]
app.use(express.json());      // Standard for receiving JSON data

// Environment Variables
const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 3000;

// Mongoose Schema and Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  description: { type: String }
});

const Product = mongoose.model('Product', productSchema);


// Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    status: "Online",
    message: "AWS Backend is reachable!",
    owner: "Fergus Downey", // Change this to your name!!!
    timestamp: new Date()
  });
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// REQUIREMENT: Add a POST route for '/'
app.post('/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!", // Requirement satisfied
      product: newProduct
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop the server if the password is wrong
  });




