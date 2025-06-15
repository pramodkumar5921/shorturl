const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import custom modules
const connectDB = require("./configs/mongodbConnection");
const { sanitizeInput } = require("./middlewares/sanitizeInput");
const limiter = require("./middlewares/rateLimiter");
const urlRoutes = require("./routes/urlRoutes");

// Create express app
const app = express();
const port = process.env.PORT || 8081;

// Connect to MongoDB
connectDB();

// ✅ CORS configuration: allow frontend origin
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// Basic middleware
app.use(express.json());

// Custom middleware
app.use(sanitizeInput);
app.use(limiter);

// Routes
app.use("/api", urlRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener API");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: "Route not Found",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
