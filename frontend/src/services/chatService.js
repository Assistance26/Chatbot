// const API_URL = "http://localhost:5000";

// const chatService = {
//     getResponse: async (message, retries = 3, timeout = 10000, delay = 2000) => {
//         let attempt = 0;

//         while (attempt <= retries) {
//             attempt++;
//             const controller = new AbortController();
//             const signal = controller.signal;

//             const timeoutId = setTimeout(() => {
//                 controller.abort();
//                 console.warn(`⏳ Request timeout (Attempt ${attempt}/${retries + 1}). Retrying...`);
//             }, timeout);

//             try {
//                 const response = await fetch(`${API_URL}/chat`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ message }),
//                     signal,
//                 });

//                 clearTimeout(timeoutId);

//                 if (!response.ok) {
//                     console.warn(`⚠️ Server responded with ${response.status}: ${response.statusText}`);
//                     if (response.status >= 400 && response.status < 500) {
//                         // Client-side errors shouldn't be retried
//                         return { success: false, error: "Invalid request. Please check input." };
//                     }
//                     throw new Error(`Server error (${response.status}): ${response.statusText}`);
//                 }

//                 const data = await response.json();

//                 if (!data || typeof data !== "object" || !data.reply) {
//                     console.error("⚠️ Unexpected API response format:", data);
//                     throw new Error("Invalid AI response format.");
//                 }

//                 return { success: true, reply: data.reply };
//             } catch (error) {
//                 clearTimeout(timeoutId); // Ensure cleanup

//                 if (error.name === "AbortError") {
//                     console.error(`⚠️ Request aborted due to timeout (Attempt ${attempt}/${retries + 1}).`);
//                 } else {
//                     console.error(`❌ Chat Service Error: ${error.message}`);
//                 }

//                 if (attempt <= retries) {
//                     const jitter = Math.random() * 500; // Add randomness to delay
//                     const retryDelay = delay + jitter;
//                     console.warn(`🔄 Retrying in ${(retryDelay / 1000).toFixed(1)}s... Attempts left: ${retries - attempt + 1}`);
//                     await new Promise(resolve => setTimeout(resolve, retryDelay));
//                 } else {
//                     return { success: false, error: error.message || "Failed to fetch chat response." };
//                 }
//             }
//         }
//     },
// };

// export default chatService;

const HF_API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b";
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Read from Vite env

const chatService = {
    getResponse: async (message, aiPersona = "default", retries = 3, timeout = 10000, delay = 2000) => {
        let attempt = 0;
        console.log("🟢 ChatService Query:", message);
        console.log("🟢 AI Persona:", aiPersona);

        while (attempt <= retries) {
            attempt++;
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => {
                controller.abort();
                console.warn(`⏳ Request timeout (Attempt ${attempt}/${retries + 1}). Retrying...`);
            }, timeout);

            try {
                // ✅ Call your own backend instead of Hugging Face directly
                const response = await fetch("http://localhost:5000/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message, aiPersona }),
                    signal,
                });

                clearTimeout(timeoutId);

                console.log(`🟢 Response Status: ${response.status} - ${response.statusText}`);

                if (!response.ok) {
                    throw new Error(`API Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("🟢 Backend API Response:", data);

                // Validate API response structure
                if (!data || !data.success || !Array.isArray(data.reply)) {
                    throw new Error(data.error || "Unexpected API response format.");
                }

                return { success: true, reply: data.reply[0] }; // Ensure the first reply is returned
            } catch (error) {
                clearTimeout(timeoutId);
                console.error(`❌ Chat Service Error: ${error.message}`);

                if (attempt <= retries) {
                    const retryDelay = delay + Math.random() * 500;
                    console.warn(`🔄 Retrying in ${(retryDelay / 1000).toFixed(1)}s... Attempts left: ${retries - attempt}`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                } else {
                    return { success: false, reply: ["Error: AI service is unavailable."] };
                }
            }
        }
    },
};

export default chatService;
