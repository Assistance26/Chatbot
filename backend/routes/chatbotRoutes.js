const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const HF_API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

router.post("/query", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("🟢 Received message:", message);

        if (!HF_API_KEY) {
            console.error("❌ Missing Hugging Face API Key!");
            return res.status(500).json({ success: false, error: "Hugging Face API Key is missing" });
        }

        console.log("🔗 Sending request to Hugging Face API...");
        const response = await axios.post(
            HF_API_URL,
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("🟢 Hugging Face API Response:", response.data);
        res.json({ success: true, reply: response.data });
    } catch (error) {
        console.error("❌ Error fetching AI response:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: error.response?.data?.error || "AI service unavailable.",
        });
    }
});

module.exports = router;
