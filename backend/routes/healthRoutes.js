const express = require("express");
const healthController = require("../controllers/healthController");


const router = express.Router();

router.post("/store",  healthController.storeHealthData);
router.get("/data", healthController.getHealthData);

module.exports = router;
