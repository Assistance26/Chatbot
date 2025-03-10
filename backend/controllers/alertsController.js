const Alert = require("../models/Alerts"); // Ensure correct import

// Get alerts for the authenticated user
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ userId: req.user.userId }); // Ensure correct userId
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching alerts", error: error.message });
    }
};

// Create a new alert
exports.createAlert = async (req, res) => {
    try {
        const newAlert = new Alert({ ...req.body, userId: req.user.userId }); // Ensure correct userId
        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ message: "Error creating alert", error: error.message });
    }
};

// Acknowledge an alert (mark as read)
exports.acknowledgeAlert = async (req, res) => {
    try {
        const { alertId } = req.body;
        if (!alertId) {
            return res.status(400).json({ message: "Alert ID is required" });
        }

        const alert = await Alert.findByIdAndUpdate(
            alertId,
            { status: "read" },
            { new: true }
        );

        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.json({ message: "Alert acknowledged", alert });
    } catch (error) {
        res.status(500).json({ message: "Error acknowledging alert", error: error.message });
    }
};
