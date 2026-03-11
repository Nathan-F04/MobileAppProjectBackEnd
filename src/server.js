// src/server.js
require('dotenv').config(); // Load env vars first!
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db'); // Import DB logic

// Import Routes
const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const basketRoutes = require('./routes/basketRoutes');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect to Database
connectDB();

// Use Routes
app.use('/', indexRoutes); // Handles /api/status
app.use('/auth', authRoutes);
// Mount product routes at the '/products' base path (JWT protected)
app.use('/products', protect, productRoutes);
// Mount basket routes (JWT protected)
app.use('/basket', protect, basketRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});