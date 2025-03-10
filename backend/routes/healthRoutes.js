const express = require("express");
const healthController = require("../controllers/healthController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/store", authMiddleware, healthController.storeHealthData);
router.get("/data", authMiddleware, healthController.getHealthData);

module.exports = router;
