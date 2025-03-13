const express = require("express");
const anomalyController = require("../controllers/anomalyController");

const router = express.Router();

// ✅ Removed authMiddleware from all routes
router.get("/", anomalyController.getAnomalies);
router.post("/flag", anomalyController.flagAnomaly);

module.exports = router;
