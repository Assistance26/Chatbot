const { InferenceClient } = require("@huggingface/inference");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_NAME = "maheshhuggingface/Medical-Data-Question-Answers-finetuned-gpt2";
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const TIMEOUT = 30000; // 30 seconds

if (!HUGGINGFACE_API_KEY) {
    console.error("❌ HUGGINGFACE_API_KEY is not set in environment variables!");
}

const client = new InferenceClient(HUGGINGFACE_API_KEY);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const formatResponse = (text, persona) => {
    const promptRegex = new RegExp(`\\[${persona}\\].*?Response:`, 'i');
    text = text.replace(promptRegex, '').trim();
    
    const sentences = text.split(/[.!?]+/);
    let response = sentences[0];
    
    if (!response.match(/[.!?]$/)) {
        response += '.';
    }

    return response;
};

exports.chatbotQuery = async (req, res) => {
    try {
        const { message, persona = "Medical Assistant" } = req.body;
        console.log("📝 Request body:", req.body);

        if (!message) {
            console.log("❌ Missing message in request");
            return res.status(400).json({ success: false, error: "Message is required" });
        }

        if (!HUGGINGFACE_API_KEY) {
            console.error("❌ HUGGINGFACE_API_KEY is not set!");
            return res.status(500).json({ success: false, error: "API key configuration error" });
        }

        const contextualizedMessage = `[${persona}] ${message}\nResponse:`;
        console.log("🤖 Sending to Hugging Face:", contextualizedMessage);

        let lastError = null;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await client.textGenerationRaw({
                    model: MODEL_NAME,
                    inputs: contextualizedMessage,
                    parameters: {
                        max_length: 200,
                        temperature: 0.5,
                        top_p: 0.9,
                        do_sample: true,
                        num_return_sequences: 1,
                        repetition_penalty: 1.2,
                        length_penalty: 1.0
                    }
                });

                console.log("📥 Raw Hugging Face response:", response);

                if (!response || !Array.isArray(response) || !response[0]?.generated_text) {
                    console.error("❌ Empty or invalid response from Hugging Face");
                    return res.status(500).json({ success: false, error: "Empty response from AI service" });
                }

                const reply = formatResponse(response[0].generated_text, persona);
                console.log("✅ AI Response:", reply);

                return res.json({ success: true, reply });

            } catch (apiError) {
                lastError = apiError;
                const errorMsg = apiError?.message || "";
                console.error(`❌ Hugging Face API Error (Attempt ${attempt}/${MAX_RETRIES}):`, errorMsg);
                
                if (errorMsg.includes('503') || errorMsg.includes('429') || errorMsg.includes('timeout')) {
                    if (attempt < MAX_RETRIES) {
                        const delay = RETRY_DELAY * attempt;
                        console.log(`⏳ Service temporarily unavailable. Retrying in ${delay / 1000} seconds...`);
                        await sleep(delay);
                        continue;
                    }
                }
                break;
            }
        }

        const errorMessage = lastError?.message?.includes('503')
            ? "The AI service is temporarily unavailable. Please try again in a few minutes."
            : "Failed to get AI response";
            
        return res.status(503).json({ 
            success: false, 
            error: errorMessage,
            details: lastError?.message
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return res.status(500).json({ 
            success: false, 
            error: "An unexpected error occurred",
            details: error.message
        });
    }
};
