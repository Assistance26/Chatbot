const express = require("express");

const chatbotRoutes = require("./chatbotRoutes");
const healthRoutes = require("./healthRoutes");
const sentimentRoutes = require("./sentimentRoutes");
const anomalyRoutes = require("./anomalyRoutes");
const alertsRoutes = require("./alertsRoutes");
const reportsRoutes = require("./reportsRoutes");
const websocketRoutes = require("./websocketRoutes");

const router = express.Router();

// ✅ Removed authRoutes
router.use("/chatbot", chatbotRoutes);
router.use("/health", healthRoutes);
router.use("/sentiment", sentimentRoutes);
router.use("/anomalies", anomalyRoutes);
router.use("/alerts", alertsRoutes);
router.use("/reports", reportsRoutes);
router.use("/websocket", websocketRoutes);

module.exports = router;
