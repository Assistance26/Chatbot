// controllers/healthController.js
const HealthData = require("../models/HealthData");

exports.storeHealthData = async (req, res) => {
    try {
        const { userId, healthMetrics } = req.body;
        const healthData = new HealthData({ userId, healthMetrics });
        await healthData.save();
        res.status(201).json({ message: "Health data saved" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHealthData = async (req, res) => {
    try {
        const data = await HealthData.find({ userId: req.user.userId });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};