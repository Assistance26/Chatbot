const express = require("express");
const healthController = require("../controllers/healthController");

const router = express.Router();

// ✅ Removed authMiddleware from all routes
router.post("/store", healthController.storeHealthData);
router.get("/data", healthController.getHealthData);

router.get("/", (req, res) => {
    res.json({ status: "ok" });
});

module.exports = router;
