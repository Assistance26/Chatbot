const { getChatbotResponse } = require("../services/openaiService");

exports.chatbotQuery = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const response = await getChatbotResponse(message);
        res.json({ response });
    } catch (error) {
        console.error("Chatbot Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
