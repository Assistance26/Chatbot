import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center px-6">
            {/* ✨ Animated Hero Section */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg"
            >
                Your AI-Powered Health Companion 🚀
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.6 }} 
                className="text-lg text-gray-800 max-w-lg mb-6"
            >
                Get personalized health insights, track trends, and stay ahead with AI-driven recommendations.
            </motion.p>

            {/* 🌟 Feature Highlights */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ delay: 0.4, duration: 0.5 }} 
                className="bg-white shadow-xl rounded-xl p-6 max-w-md mb-6 border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">✨ Why Choose Us?</h2>
                <ul className="text-gray-700 space-y-2 text-left">
                    <li>✅ AI-driven health insights tailored for you</li>
                    <li>✅ Personalized fitness & nutrition guidance</li>
                    <li>✅ Smart tracking of health patterns & trends</li>
                    <li>✅ Secure & encrypted health data storage</li>
                </ul>
            </motion.div>

            {/* 🚀 Call-to-Action Button */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <Link to="/dashboard">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                        Explore Dashboard →
                    </button>
                </Link>
            </motion.div>
        </div>
    );
}

export default HomePage;
