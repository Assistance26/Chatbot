// controllers/anomalyController.js
const Anomaly = require('../models/Anomalies');

exports.getAnomalies = async (req, res) => {
    try {
        const anomalies = await Anomaly.find({ userId: req.user.id });
        res.json(anomalies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching anomalies', error });
    }
};

exports.flagAnomaly = async (req, res) => {
    try {
        const anomaly = new Anomaly({ ...req.body, userId: req.user.id });
        await anomaly.save();
        res.status(201).json(anomaly);
    } catch (error) {
        res.status(500).json({ message: 'Error flagging anomaly', error });
    }
};
