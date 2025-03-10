const express = require("express");
const websocketController = require("../controllers/websocketController");

const router = express.Router();
require("express-ws")(router); // ✅ Fix: Attach express-ws to router

// WebSocket route
router.ws("/realtime", websocketController.handleWebSocket);

module.exports = router;
