// src/hooks/useHealthAlerts.js
import { useState, useEffect } from "react";

function useHealthAlerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Simulated fetch (replace with actual API call)
        setTimeout(() => {
            setAlerts([
                { id: 1, message: "High blood pressure detected!" },
                { id: 2, message: "You haven’t logged your diet today." },
            ]);
        }, 1000);
    }, []);

    return alerts;
}

export default useHealthAlerts;
