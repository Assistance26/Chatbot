import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, BarChart, Activity } from "lucide-react";
import useTensorFlow from "../hooks/useTensorFlow"; // AI Prediction Hook

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { predictHealthRisk } = useTensorFlow();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports"); // Replace with actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch reports");
        const data = await response.json();
        
        // AI-based health analysis
        const updatedReports = await Promise.all(
          data.map(async (report) => {
            const risk = await predictHealthRisk(report.vitals);
            return { ...report, riskLevel: risk.riskLevel };
          })
        );
        
        setReports(updatedReports);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [predictHealthRisk]);

  const getRiskStyle = (riskLevel) => {
    if (riskLevel > 0.8) return "text-red-600 bg-red-100";
    if (riskLevel > 0.5) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex flex-col items-center">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <BarChart size={30} className="text-blue-500" />
          AI-Powered Health Reports
        </h2>
        <p className="text-gray-600 mt-2">AI-generated health insights and risk predictions.</p>
      </motion.div>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-500 animate-pulse">Loading reports...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Reports List */}
      {!loading && !error && reports.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
        >
          <ul className="space-y-4">
            {reports.map((report) => (
              <motion.li
                key={report.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRiskStyle(report.riskLevel)}`}>
                  Risk: {report.riskLevel > 0.8 ? "High" : report.riskLevel > 0.5 ? "Medium" : "Low"}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ) : (
        !loading && <p className="text-gray-500 italic">No reports available.</p>
      )}
    </div>
  );
}

export default Reports;