const express = require("express");
const alertsController = require("../controllers/alertsController");

const router = express.Router();

// ✅ Removed authMiddleware from all routes
router.get("/", alertsController.getAlerts);
router.post("/create", alertsController.createAlert);
router.post("/acknowledge", alertsController.acknowledgeAlert);

module.exports = router;
