const mongoose = require("mongoose");

// Alerts Schema
const AlertsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    alertType: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "acknowledged"], default: "unread" },
    createdAt: { type: Date, default: Date.now }
});

const Alerts = mongoose.model("Alerts", AlertsSchema);
module.exports = Alerts;
