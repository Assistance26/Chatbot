const MoodTracking = require('../models/MoodTracking');
const sentimentService = require('../services/sentimentService');

exports.analyzeMood = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: "Text is required for sentiment analysis" });
        }

        const mood = sentimentService.analyzeSentiment(req.body.text); // Corrected function name
        const moodEntry = new MoodTracking({ userId: req.user.id, mood });

        await moodEntry.save();
        res.json(moodEntry);
    } catch (error) {
        console.error("❌ Error analyzing mood:", error);
        res.status(500).json({ message: "Error analyzing mood", error: error.message });
    }
};
