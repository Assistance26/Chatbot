import { useEffect, useState } from "react";
import apiService from "../services/apiService";

function useHealthData() {
    const [healthData, setHealthData] = useState(null);
    const [reports, setReports] = useState([]); // Add reports state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.getHealthData();
                setHealthData(data);

                const reportsData = await apiService.getHealthReports(); // Fetch reports
                setReports(reportsData);
            } catch (error) {
                console.error("Health Data Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateHealthData = async (newData) => {
        try {
            const updatedData = await apiService.updateHealthData(newData);
            setHealthData(updatedData);
        } catch (error) {
            console.error("Health Data Update Error:", error);
        }
    };

    return { healthData, reports, loading, updateHealthData };
}

export default useHealthData;
