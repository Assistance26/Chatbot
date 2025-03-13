const Reports = require("../models/Reports");

// Generate and save a new report
exports.generateReport = async (req, res) => {
    try {
        const { reportData } = req.body;
        const userId = req.user.userId; // Ensure userId is in the token payload

        const report = new Reports({ userId, reportData });
        await report.save();
        
        res.status(201).json({ message: "Report generated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reports for a user
exports.getReports = async (req, res) => {
    try {
        const reports = await Reports.find({ userId: req.user.userId });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch the weekly report
exports.getWeeklyReport = async (req, res) => {
    try {
        const weeklyReport = await Reports.find({
            userId: req.user.userId,
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
        });
        res.json(weeklyReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch the monthly report
exports.getMonthlyReport = async (req, res) => {
    try {
        const monthlyReport = await Reports.find({
            userId: req.user.userId,
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        });
        res.json(monthlyReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
