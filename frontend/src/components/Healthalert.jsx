import useHealthAlerts from "../hooks/useHealthAlerts";

function HealthAlert() {
    const alerts = useHealthAlerts();

    return (
        <div className="alerts">
            <h2>Health Alerts</h2>
            {alerts.length > 0 ? (
                alerts.map((alert, index) => <p key={index}>{alert.message}</p>)
            ) : (
                <p>No alerts available.</p>
            )}
        </div>
    );
}

export default HealthAlert;
