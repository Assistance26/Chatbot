const express = require("express");
const reportsController = require("../controllers/reportsController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/weekly", authMiddleware, reportsController.getWeeklyReport);
router.get("/monthly", authMiddleware, reportsController.getMonthlyReport);
router.get("/", authMiddleware, reportsController.getReports);
router.post("/", authMiddleware, reportsController.generateReport);

module.exports = router;
