import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import { HealthProvider } from "./context/HealthContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChatbotProvider } from "./context/ChatbotContext";

// ✅ Improved Protected Route
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="loading-screen">Checking authentication...</div>;
    return user ? children : <Navigate to="/" replace />;
}

function App() {
    return (
        <AuthProvider>
            <HealthProvider>
                <ChatbotProvider>
                    <Routes> {/* ✅ No extra <Router> */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    </Routes>
                </ChatbotProvider>
            </HealthProvider>
        </AuthProvider>
    );
}

export default App;
