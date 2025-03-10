const tf = require("@tensorflow/tfjs-node");

const predictHealthRisk = async (inputData) => {
    try {
        // Load pre-trained model (Placeholder - Replace with actual model path)
        const model = await tf.loadLayersModel("file://models/healthModel.json");

        // Convert input data to tensor
        const inputTensor = tf.tensor2d([inputData]);

        // Make prediction
        const prediction = model.predict(inputTensor);
        const riskLevel = prediction.dataSync()[0];

        return { riskLevel };
    } catch (error) {
        console.error("❌ Health AI Prediction Error:", error);
        return { error: "AI health prediction failed" };
    }
};

module.exports = { predictHealthRisk };
