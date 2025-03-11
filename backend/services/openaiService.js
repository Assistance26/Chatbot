const axios = require("axios");
const { OPENAI_API_KEY } = require("../config/apiKeys");

async function getChatbotResponse(message) { // ✅ Use a named function
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return { reply: response.data.choices[0].message.content };

    } catch (error) {
        console.error("❌ OpenAI API Error:", error.response?.data || error);
        return "⚠️ Sorry, I'm unable to process your request at the moment.";
    }
}

// ✅ Fix export to match the named import
module.exports = { getChatbotResponse };
