const express = require("express");

const router = express.Router();

// ✅ WebSocket route (No need to initialize express-ws again)
router.ws("/realtime", (ws, req) => {
    console.log("WebSocket connection established");

    ws.on("message", (msg) => {
        console.log("Received message:", msg);
        ws.send(`Echo: ${msg}`); // Example response
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
});

module.exports = router;
