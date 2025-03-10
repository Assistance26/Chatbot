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

const API_URL = "http://localhost:5000";

const chatService = {
    getResponse: async (message, retries = 3, timeout = 10000, delay = 2000) => {
        let attempt = 0;
        console.log(message);
        while (attempt <= retries) {
            attempt++;
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => {
                controller.abort();
                console.warn(`⏳ Request timeout (Attempt ${attempt}/${retries + 1}). Retrying...`);
            }, timeout);

            try {
                const response = await fetch(`${API_URL}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                    signal,
                });
                
                clearTimeout(timeoutId);

                if (!response.ok) {
                    console.warn(`⚠️ Server responded with ${response.status}: ${response.statusText}`);

                    if (response.status >= 400 && response.status < 500) {
                        return { success: false, error: "Invalid request. Please check input." };
                    }

                    if (response.status >= 500 && response.status < 600) {
                        console.error("⚠️ Server-side error. Retrying may not help.");
                        throw new Error(`Server error (${response.status}): ${response.statusText}`);
                    }
                }

                let data;
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error("⚠️ Failed to parse JSON response:", jsonError);
                    throw new Error("Invalid AI response format.");
                }

                if (!data || typeof data !== "object" || !data.reply || data.reply.trim() === "") {
                    console.error("⚠️ Unexpected API response format:", data);
                    throw new Error("AI response is empty or invalid.");
                }

                return { success: true, reply: data.reply };
            } catch (error) {
                clearTimeout(timeoutId); // Ensure cleanup

                if (error.name === "AbortError") {
                    console.error(`⚠️ Request aborted due to timeout (Attempt ${attempt}/${retries + 1}).`);
                } else {
                    console.error(`❌ Chat Service Error: ${error.message}`);
                }

                if (attempt <= retries) {
                    const jitter = Math.random() * 500; // Add randomness to delay
                    const retryDelay = delay + jitter;
                    console.warn(`🔄 Retrying in ${(retryDelay / 1000).toFixed(1)}s... Attempts left: ${retries - attempt + 1}`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                } else {
                    return { success: false, error: error.message || "Failed to fetch chat response." };
                }
            }
        }
    },
};

export default chatService;

