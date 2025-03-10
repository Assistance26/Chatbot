import React from "react";
import useHealthData from "../hooks/useHealthData";
import { motion } from "framer-motion";

function ReportsPage() {
    const { reports, loading } = useHealthData(); // ✅ Include `loading`

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold text-gray-600">📄 Loading health reports...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6">
            {/* 📝 Reports Header */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-center text-gray-800 mb-8"
            >
                📊 Health Reports
            </motion.h1>

            {reports && reports.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {reports.map((report, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: index * 0.1 }}
                            className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg border border-gray-200"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{report.title}</h3>
                            <p className="text-gray-600 text-sm">{report.description}</p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-500 text-lg">⚠️ No reports available at the moment.</p>
                </div>
            )}
        </div>
    );
}

export default ReportsPage;
