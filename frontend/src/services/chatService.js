const API_URL = "http://localhost:5000";

const chatService = {
    getResponse: async (message, retries = 3, timeout = 10000, delay = 2000) => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const timeoutId = setTimeout(() => {
            controller.abort();
            console.warn("⏳ Request timed out and was aborted.");
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
                throw new Error(`Server error (${response.status}): ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, reply: data.reply };
        } catch (error) {
            clearTimeout(timeoutId); // Ensure timeout is cleared on error

            if (error.name === "AbortError") {
                console.error("⚠️ Request aborted due to timeout.");
            } else {
                console.error("❌ Chat Service Error:", error.message);
            }

            if (retries > 0 && error.name !== "AbortError") {
                console.warn(`🔄 Retrying request in ${delay / 1000} seconds... Attempts left: ${retries - 1}`);
                await new Promise(resolve => setTimeout(resolve, delay)); // Exponential backoff
                return chatService.getResponse(message, retries - 1, timeout, delay * 2);
            }

            return { success: false, error: error.message || "Failed to fetch chat response" };
        }
    },
};

export default chatService;