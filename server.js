const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
// Load environment variables
dotenv.config();

// Import custom modules
const connectDB = require("./configs/mongodbConnection");
const { sanitizeInput } = require("./middlewares/sanitizeInput");
const limiter = require("./middlewares/rateLimiter");
const urlRoutes = require("./routes/urlRoutes");

// Create express app
const app = express();
app.set('trust proxy', 1);
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
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware
app.use(sanitizeInput);
app.use(limiter);

// Routes
app.use("/api", urlRoutes);

// Base route
// app.get("/", (req, res) => {
//   res.send();
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
