const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressWs = require("express-ws"); // Import express-ws
const bodyParser = require("body-parser");

// Initialize Express app with WebSocket support
const app = express();
expressWs(app); // ✅ Attach WebSocket functionality to Express

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const alertsRoutes = require("./routes/alertsRoutes");
const anomalyRoutes = require("./routes/anomalyRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const websocketRoutes = require("./routes/websocketRoutes"); // ✅ Fix: Import WebSocket routes

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/anomalies", anomalyRoutes);
app.use("/api/sentiment", sentimentRoutes);
app.use("/api/websocket", websocketRoutes); // ✅ Use WebSocket route

// MongoDB Connection
const PORT = process.env.PORT || 5000;
 const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  // console.log("urfi:",MONGO_URI);
  
  
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
