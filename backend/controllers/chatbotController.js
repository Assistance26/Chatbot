// // const { getChatbotResponse } = require("../services/openaiService");

// // exports.chatbotQuery = async (req, res) => {
// //     try {
// //         const { message } = req.body;
// //         if (!message) return res.status(400).json({ error: "Message is required" });

// //         const response = await getChatbotResponse(message);
// //         res.json({ response });
// //     } catch (error) {
// //         console.error("Chatbot Error:", error.message);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // };

// const { getChatbotResponse } = require("../services/openaiService");

// exports.chatbotQuery = async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) {
//             return res.status(400).json({ error: "Message field is required in the request body." });
//         }

//         const response = await getChatbotResponse(message);
//         if (!response || !response.reply) {
//             return res.status(500).json({ error: "Failed to receive a valid response from the AI service." });
//         }

//         res.json({ response });
//     } catch (error) {
//         console.error("Chatbot Error:", error.message);
//         // General error logging and a more detailed client-friendly message
//         res.status(500).json({ error: "Internal server error. Please try again later." });
//     }
// };

const { getHuggingFaceResponse } = require("../services/openaiService");

exports.chatbotQuery = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const response = await getHuggingFaceResponse(message);
        res.json({ response });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
