const HealthData = require("../models/HealthData");

// Function to fetch user health data
const fetchUserHealthData = async (userId) => {
    try {
        // Fetch health data from MongoDB
        const healthData = await HealthData.findOne({ userId });

        if (!healthData) {
            return { error: "No health data found for this user" };
        }

        return healthData;
    } catch (error) {
        console.error("❌ Error fetching health data:", error);
        return { error: "Failed to fetch health data" };
    }
};

module.exports = { fetchUserHealthData };
