// const { getChatbotResponse } = require("../services/openaiService");

// exports.chatbotQuery = async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) return res.status(400).json({ error: "Message is required" });

//         const response = await getChatbotResponse(message);
//         res.json({ response });
//     } catch (error) {
//         console.error("Chatbot Error:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

const { getChatbotResponse } = require("../services/openaiService");

exports.chatbotQuery = async (req, res) => {
    try {
        console.log("🟢 Received request body:", req.body); // ✅ Log the request body

        const { message } = req.body;
        if (!message || typeof message !== "string") {
            console.log("❌ Invalid input:", req.body); // ✅ Log invalid input
            return res.status(400).json({ success: false, error: "Invalid request. Please check input." });
        }

        console.log("🟢 Processing message:", message); // ✅ Confirm valid message

        const response = await getChatbotResponse(message);

        console.log("🛠 Backend AI Response:", response); // ✅ Log AI response

        if (!response) {
            return res.status(500).json({ success: false, error: "Failed to receive a valid response from AI service." });
        }

        res.json({ success: true, reply: response });
    } catch (error) {
        console.error("❌ Chatbot Error:", error);
        res.status(500).json({ success: false, error: "Internal server error. Please try again later." });
    }
};
