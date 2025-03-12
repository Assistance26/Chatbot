const express = require("express");
const anomalyController = require("../controllers/anomalyController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", anomalyController.getAnomalies);
router.post("/flag", anomalyController.flagAnomaly);

module.exports = router;
