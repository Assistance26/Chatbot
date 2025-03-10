const express = require("express");
const alertsController = require("../controllers/alertsController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, alertsController.getAlerts);
router.post("/create", authMiddleware, alertsController.createAlert);
router.post("/acknowledge", authMiddleware, alertsController.acknowledgeAlert);

module.exports = router;
