import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, Activity } from "lucide-react";
import useTensorFlow from "../hooks/useTensorFlow"; // AI Model Hook

const HealthAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const { predictHealthRisk, loading: aiLoading } = useTensorFlow(); // AI Prediction Hook

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000"); // Connect to WebSocket backend

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            
            if (data.vitals && !aiLoading) {
                const result = await predictHealthRisk(data.vitals);
                updateAlerts(result.riskLevel);
            }
        };

        return () => socket.close(); // Cleanup on unmount
    }, [predictHealthRisk, aiLoading]);

    const updateAlerts = async (riskLevel) => {
        let newAlert;
        let message;

        if (riskLevel > 0.8) {
            newAlert = { type: "error", message: "🚨 AI Detected Critical Health Risk!", timestamp: Date.now() };
            message = "🚨 Critical Health Alert! Immediate attention needed.";
            
            // Send Email & SMS Alert
            await fetch("http://localhost:5000/send-alert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "user@example.com", // Replace with actual user email
                    phone: "+1234567890", // Replace with actual user phone number
                    message,
                }),
            });
        } else if (riskLevel > 0.5) {
            newAlert = { type: "warning", message: "⚠️ AI Detected Moderate Health Risk", timestamp: Date.now() };
        } else {
            newAlert = { type: "success", message: "✅ AI Analysis: Health is stable", timestamp: Date.now() };
        }

        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        // Auto-clear alerts after 10 seconds
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.timestamp !== newAlert.timestamp));
        }, 10000);
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case "success":
                return { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="text-green-600" /> };
            case "warning":
                return { bg: "bg-yellow-100", text: "text-yellow-800", icon: <AlertTriangle className="text-yellow-600" /> };
            case "error":
                return { bg: "bg-red-100", text: "text-red-800", icon: <XCircle className="text-red-600" /> };
            default:
                return { bg: "bg-blue-100", text: "text-blue-800", icon: <Info className="text-blue-600" /> };
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Activity size={20} className="text-blue-500" /> AI-Powered Health Alerts
            </h2>

            {alerts.length > 0 ? (
                alerts.map((alert, index) => {
                    const { bg, text, icon } = getAlertStyle(alert.type);
                    return (
                        <div key={index} className={`flex items-center ${bg} p-3 rounded-lg mb-2 shadow-sm`}>
                            {icon}
                            <p className={`ml-3 font-medium ${text}`}>{alert.message}</p>
                        </div>
                    );
                })
            ) : (
                <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                    <Info className="text-gray-600" />
                    <p className="ml-3 text-gray-700">No alerts available.</p>
                </div>
            )}
        </div>
    );
};

export default HealthAlert;