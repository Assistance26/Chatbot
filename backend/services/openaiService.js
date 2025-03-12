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

    const API_URL = "https://api-inference.huggingface.co/models/microsoft/BioGPT";
    const API_KEY = "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";  // Replace with your actual token
    const getHuggingFaceResponse = async (message) => {
        if (!API_KEY) {
            console.error("❌ Hugging Face API Key is missing.");
            return { error: "AI service unavailable." };
        }
    
        try {
            const response = await axios.post(
                API_URL,
                { inputs: message },
                { headers: { Authorization: `Bearer ${API_KEY}` } }
            );
    
            console.log("🟢 Hugging Face Raw Response:", response.data);
    
            // Ensure we are extracting the right data
            if (Array.isArray(response.data) && response.data.length > 0) {
                const aiReply = response.data[0].generated_text || "No response from AI.";
                console.log("✅ Extracted AI Reply:", aiReply);
                return aiReply;
            }
    
            console.error("⚠️ Unexpected AI response format:", response.data);
            return "Unexpected AI response format.";
        } catch (error) {
            console.error("❌ Hugging Face API Error:", error?.response?.data || error.message);
            return { error: "Failed to fetch response from AI." };
        }
    };
    
    module.exports = { getHuggingFaceResponse };
