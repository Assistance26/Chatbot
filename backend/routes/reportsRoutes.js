const express = require("express");
const reportsController = require("../controllers/reportsController");

const router = express.Router();

router.get("/weekly", reportsController.getWeeklyReport);
router.get("/monthly", reportsController.getMonthlyReport);
router.get("/", reportsController.getReports);
router.post("/", reportsController.generateReport);

module.exports = router;
