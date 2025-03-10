const API_URL = "http://localhost:5000";

const chatService = {
    getResponse: async (message) => {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        return data.reply;
    },
};

export default chatService;
