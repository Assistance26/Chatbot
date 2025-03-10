import { useEffect, useState, useCallback } from "react";
import apiService from "../services/apiService";
import useTensorFlow from "./useTensorFlow"; // AI Model Hook

function useHealthData() {
    const [healthData, setHealthData] = useState(null);
    const [reports, setReports] = useState([]); // Health Reports
    const [riskLevel, setRiskLevel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { predictHealthRisk, loading: aiLoading } = useTensorFlow(); // Load AI Model

    // Fetch Health Data & Reports
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [data, reportsData] = await Promise.all([
                apiService.getHealthData(),
                apiService.getHealthReports(),
            ]);

            setHealthData(data);
            setReports(reportsData);

            // AI Prediction if vitals exist
            if (data?.vitals && !aiLoading) {
                const result = await predictHealthRisk(data.vitals);
                if (!result.error) setRiskLevel(result.riskLevel);
            }
        } catch (err) {
            console.error("❌ Health Data Fetch Error:", err);
            setError(err.message || "Failed to fetch health data.");
        } finally {
            setLoading(false);
        }
    }, [predictHealthRisk, aiLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Update Health Data & Recalculate AI Risk
    const updateHealthData = async (newData) => {
        try {
            const updatedData = await apiService.updateHealthData(newData);
            setHealthData(updatedData);

            // AI Prediction Update
            if (updatedData?.vitals && !aiLoading) {
                const result = await predictHealthRisk(updatedData.vitals);
                if (!result.error) setRiskLevel(result.riskLevel);
            }
        } catch (err) {
            console.error("❌ Health Data Update Error:", err);
            setError(err.message || "Failed to update health data.");
        }
    };

    return { healthData, reports, riskLevel, loading, error, updateHealthData, refresh: fetchData };
}

export default useHealthData;
