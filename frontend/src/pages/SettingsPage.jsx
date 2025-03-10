import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react"; // ✅ Modern UI Toggle Switch

function SettingsPage() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const handleToggle = () => {
        setNotificationsEnabled((prev) => !prev);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-gray-200"
        >
            {/* 🛠️ Settings Header */}
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                ⚙️ Settings
            </h1>

            {/* 🌟 Notification Preferences */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">📩 Notifications</h2>
                    <p className="text-sm text-gray-500">
                        {notificationsEnabled ? "You will receive health alerts & updates." : "Notifications are currently disabled."}
                    </p>
                </div>

                {/* ✅ Animated Toggle Switch */}
                <Switch
                    checked={notificationsEnabled}
                    onChange={handleToggle}
                    className={`${notificationsEnabled ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-7 w-14 items-center rounded-full transition-all`}
                >
                    <span 
                        className={`${
                            notificationsEnabled ? "translate-x-7 bg-white" : "translate-x-1 bg-gray-500"
                        } inline-block h-5 w-5 transform rounded-full shadow-md transition-all`}
                    />
                </Switch>
            </div>

            {/* 🎨 Animated Save Button */}
            <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={handleToggle} 
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all"
            >
                {notificationsEnabled ? "Disable Notifications ❌" : "Enable Notifications ✅"}
            </motion.button>
        </motion.div>
    );
}

export default SettingsPage;