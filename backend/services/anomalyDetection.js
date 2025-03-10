const tf = require("@tensorflow/tfjs-node");

const detectAnomalies = async (healthData) => {
    try {
        // Convert data to tensor
        const dataTensor = tf.tensor2d([healthData]);

        // Placeholder anomaly detection logic (replace with trained model)
        const anomalyScore = dataTensor.mean().dataSync()[0];

        return anomalyScore > 0.7 ? "Potential Anomaly Detected" : "Normal";
    } catch (error) {
        console.error("❌ Anomaly Detection Error:", error);
        return "Anomaly detection failed";
    }
};

module.exports = { detectAnomalies };
