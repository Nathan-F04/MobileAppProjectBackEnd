// src/server.js
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js"; // Import DB logic

// Import Routes
import productRoutes from "./routes/productRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import protect from "./middleware/authMiddleware.js";


dotenv.config(); // Load env vars first!
const app = express();
const PORT = process.env.PORT || 3002;

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
// Mount car routes at the '/cars' base path (JWT protected)
app.use('/cars', protect, carRoutes);
// Mount basket routes (JWT protected)
app.use('/basket', protect, basketRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});