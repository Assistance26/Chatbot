const express = require("express");
const anomalyController = require("../controllers/anomalyController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, anomalyController.getAnomalies);
router.post("/flag", authMiddleware, anomalyController.flagAnomaly);

module.exports = router;
