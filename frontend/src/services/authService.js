const API_URL = "https://your-api.com/auth";

const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },

    logout: () => {
        localStorage.removeItem("token");
    },

    register: async (userData) => {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    // ✅ Add this function to get the logged-in user
    getCurrentUser: async () => {
        const token = localStorage.getItem("token"); // Assuming you're using tokens
        if (!token) return null;

        const response = await fetch(`${API_URL}/me`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include token in request
            },
        });

        if (!response.ok) return null;
        return response.json();
    },
};

export default authService;
