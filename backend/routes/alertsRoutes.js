const express = require("express");
const alertsController = require("../controllers/alertsController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/",  alertsController.getAlerts);
router.post("/create",  alertsController.createAlert);
router.post("/acknowledge",  alertsController.acknowledgeAlert);

module.exports = router;
