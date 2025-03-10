import React from "react";
import useHealthData from "../hooks/useHealthData";

function ReportsPage() {
    const { reports, loading } = useHealthData(); // ✅ Include `loading`

    if (loading) return <p>Loading reports...</p>;

    return (
        <div className="container">
            <h1>Health Reports</h1>
            {reports && reports.length > 0 ? ( // ✅ Check if `reports` exists
                reports.map((report, index) => (
                    <div key={index} className="report-card">
                        <h3>{report.title}</h3>
                        <p>{report.description}</p>
                    </div>
                ))
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
}

export default ReportsPage;
