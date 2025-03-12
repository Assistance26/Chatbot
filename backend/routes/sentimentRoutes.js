const express = require("express");
const sentimentController = require("../controllers/sentimentController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/analyze", sentimentController.analyzeMood); // Fixed function name

module.exports = router;
