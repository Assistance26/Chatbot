const express = require("express");
const chatbotController = require("../controllers/chatbotController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/query", authMiddleware, chatbotController.chatbotQuery); // ✅ Fixed function name

module.exports = router;
