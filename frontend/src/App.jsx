import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import { HealthProvider } from "./context/HealthContext";
import { ChatbotProvider } from "./context/ChatbotContext";

function App() {
    return (
        <HealthProvider>
            <ChatbotProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </ChatbotProvider>
        </HealthProvider>
    );
}

export default App;
