const API_URL = "http://localhost:5000";

const apiService = {
    getHealthAlerts: async () => {
        const response = await fetch(`${API_URL}/alerts`);
        return response.json();
    },
};

export default apiService;
