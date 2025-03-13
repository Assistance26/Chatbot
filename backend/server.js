require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressWs = require("express-ws");
const bodyParser = require("body-parser");
const net = require('net');

// Initialize Express app with WebSocket support
const app = express();
expressWs(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path}`, {
        body: req.body,
        query: req.query,
        headers: req.headers
    });
    next();
});

// Import Routes
const healthRoutes = require("./routes/healthRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const alertsRoutes = require("./routes/alertsRoutes");
const anomalyRoutes = require("./routes/anomalyRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const websocketRoutes = require("./routes/websocketRoutes");

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/anomalies", anomalyRoutes);
app.use("/api/sentiment", sentimentRoutes);
app.use("/api/websocket", websocketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({
        success: false,
        error: "Internal server error",
        details: err.message
    });
});

// MongoDB Connection
const INITIAL_PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Function to check if a port is in use
const isPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer()
            .once('error', () => resolve(true))
            .once('listening', () => {
                server.close();
                resolve(false);
            })
            .listen(port);
    });
};

// Function to find an available port
const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (await isPortInUse(port)) {
        console.log(`⚠️ Port ${port} is in use, trying ${port + 1}...`);
        port++;
    }
    return port;
};

const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("❌ Missing MongoDB URI! Please set MONGO_URI in your .env file.");
        }

        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Find an available port
        const port = await findAvailablePort(INITIAL_PORT);

        // Start Express server after DB connection
        const server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📍 API endpoint: http://localhost:${port}/api/chatbot/query`);
        });

        // Update frontend API URL if port changed
        if (port !== INITIAL_PORT) {
            console.log(`⚠️ Using alternative port ${port}. Update your frontend API_URL to use this port.`);
        }

        // Graceful Shutdown Handler
        process.on("SIGINT", async () => {
            console.log("\n🛑 Closing server and MongoDB connection...");
            await mongoose.connection.close();
            server.close(() => {
                console.log("✅ Server shut down gracefully.");
                process.exit(0);
            });
        });

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

// Connect to Database
connectDB();
