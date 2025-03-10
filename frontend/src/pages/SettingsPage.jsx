import { useAuth } from "../context/AuthContext";

function SettingsPage() {
    const { user, updateUserPreferences } = useAuth();

    const handleUpdate = () => {
        updateUserPreferences({ notifications: true });
    };

    return (
        <div className="container">
            <h1>Settings</h1>
            <p>Notification Preferences: {user?.preferences?.notifications ? "Enabled" : "Disabled"}</p>
            <button onClick={handleUpdate} className="btn-primary">Enable Notifications</button>
        </div>
    );
}

export default SettingsPage;
