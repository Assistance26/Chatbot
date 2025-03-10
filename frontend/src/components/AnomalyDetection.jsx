import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";
import useTensorFlow from "../hooks/useTensorFlow"; // AI Model Hook

const AnomalyDetection = () => {
  const [healthData, setHealthData] = useState(null);
  const [alert, setAlert] = useState({ type: "normal", message: "All vitals are stable" });

  const { predictHealthRisk, loading: aiLoading } = useTensorFlow(); // AI Prediction Hook

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000"); // Connect to WebSocket backend

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      setHealthData(data);

      // AI-based risk assessment
      if (data.vitals && !aiLoading) {
        const result = await predictHealthRisk(data.vitals);
        updateAlert(result.riskLevel);
      }
    };

    return () => socket.close(); // Cleanup on component unmount
  }, [predictHealthRisk, aiLoading]);

  const updateAlert = (riskLevel) => {
    if (riskLevel > 0.8) {
      setAlert({ type: "critical", message: "🚨 AI Detected Critical Health Risk!" });
    } else if (riskLevel > 0.5) {
      setAlert({ type: "warning", message: "⚠️ AI Detected Moderate Risk" });
    } else {
      setAlert({ type: "normal", message: "✅ AI Analysis: All vitals are stable" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <Activity size={24} /> AI-Powered Anomaly Detection
        </h2>

        <div
          className="p-4 mb-4 rounded-md shadow-md transition-all text-center"
          style={{
            backgroundColor:
              alert.type === "critical" ? "#FFCDD2" :
              alert.type === "warning" ? "#FFF3CD" : "#DFFFD6",
            color:
              alert.type === "critical" ? "#D32F2F" :
              alert.type === "warning" ? "#856404" : "#155724"
          }}
        >
          {alert.type === "critical" && <XCircle size={24} />}
          {alert.type === "warning" && <AlertTriangle size={24} />}
          {alert.type === "normal" && <CheckCircle size={24} />}
          <p className="mt-2 text-lg font-semibold">{alert.message}</p>
        </div>

        {healthData ? (
          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
            <p>❤️ Heart Rate: <span className="font-bold">{healthData.heartRate} BPM</span></p>
            <p>🫁 Oxygen Level: <span className="font-bold">{healthData.oxygenLevel}%</span></p>
            <p>🌡️ Body Temp: <span className="font-bold">{healthData.temperature}°C</span></p>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Waiting for real-time data...</p>
        )}
      </motion.div>
    </div>
  );
};

export default AnomalyDetection;
