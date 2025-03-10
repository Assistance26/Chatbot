const axios = require("axios");
const { OPENAI_API_KEY } = require("../config/apiKeys");

const openaiService = async (message) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
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
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("❌ OpenAI API Error:", error.response?.data || error);
        return "⚠️ Sorry, I'm unable to process your request at the moment.";
    }
};

module.exports = openaiService;
