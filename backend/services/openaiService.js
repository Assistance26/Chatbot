// const axios = require("axios");
// const { OPENAI_API_KEY } = require("../config/apiKeys");

// const openaiService = async (message) => {
//     try {
//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-4",
//                 messages: [{ role: "user", content: message }],
//                 max_tokens: 150,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${OPENAI_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         return response.data.choices[0].message.content;
//     } catch (error) {
//         console.error("❌ OpenAI API Error:", error.response?.data || error);
//         return "⚠️ Sorry, I'm unable to process your request at the moment.";
//     }
// };

// module.exports = openaiService;


const axios = require("axios");

const getHuggingFaceResponse = async (message) => {
    const API_URL = "https://api-inference.huggingface.co/models/microsoft/BioGPT";
    const API_KEY = "your_huggingface_api_key";  // Replace with your actual token

    try {
        const response = await axios.post(
            API_URL,
            { inputs: message },
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        return response.data; 
    } catch (error) {
        console.error("Hugging Face API Error:", error);
        return { error: "Failed to fetch response" };
    }
};

module.exports = { getHuggingFaceResponse };
