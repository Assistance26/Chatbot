import React, { useState, useEffect } from "react";
import useHealthData from "../hooks/useHealthData";
import useTensorFlow from "../hooks/useTensorFlow"; // Import AI model
import HealthAlert from "./HealthAlert";
import Reports from "./Reports";

function Dashboard() {
    const { healthData, loading } = useHealthData();
    const { predictHealthRisk } = useTensorFlow(); // AI prediction hook
    const [riskLevel, setRiskLevel] = useState(null);

    useEffect(() => {
        const analyzeHealth = async () => {
            if (healthData) {
                const result = await predictHealthRisk([
                    healthData.heartRate,
                    healthData.oxygenLevel,
                    healthData.temperature,
                ]);
                setRiskLevel(result.riskLevel);
            }
        };
        analyzeHealth();
    }, [healthData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Loading health data...</p>
                </div>
            </div>
        );
    }

    if (!healthData) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800">Health Dashboard</h1>
                <p className="text-red-500 mt-2">⚠️ Unable to fetch health data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold">Health Dashboard</h1>
                <p className="text-lg mt-2">Welcome, <span className="font-semibold">{healthData.userName || "User"}</span>!</p>
            </div>

            {/* Grid layout for content */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Health Risk Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Health Risk Analysis</h2>
                    <p>Heart Rate: {healthData.heartRate} bpm</p>
                    <p>Oxygen Level: {healthData.oxygenLevel}%</p>
                    <p>Temperature: {healthData.temperature}°C</p>

                    <div className="mt-3">
                        <p><strong>AI Risk Level:</strong> 
                            {riskLevel === null ? "🔄 Analyzing..." :
                            riskLevel < 0.3 ? "✅ Low" :
                            riskLevel < 0.7 ? "⚠️ Medium" : "🚨 High"}
                        </p>
                    </div>
                </div>

                {/* Health Alert Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Health Alerts</h2>
                    <HealthAlert />
                </div>

                {/* Reports Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports</h2>
                    <Reports />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
