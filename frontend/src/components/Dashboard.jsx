import React from "react";
import useHealthData from "../hooks/useHealthData";
import HealthAlert from "./HealthAlert";
import Reports from "./Reports";

function Dashboard() {
    const { healthData, loading } = useHealthData();

    if (loading) {
        return <p>Loading health data...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Health Dashboard</h1>
            <p>Welcome, {healthData?.userName || "User"}</p>
            <HealthAlert />
            <Reports />
        </div>
    );
}

export default Dashboard;
