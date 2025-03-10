import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Your Health Dashboard</h1>
            <p className="text-lg text-gray-700 max-w-lg mb-6">
                Track your health, monitor trends, and get AI-driven insights for a healthier lifestyle.
            </p>

            {/* Feature Highlights */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Why Choose Us?</h2>
                <ul className="text-gray-600 space-y-2 text-left">
                    <li>✅ AI-powered health insights</li>
                    <li>✅ Personalized recommendations</li>
                    <li>✅ Track fitness & health trends</li>
                    <li>✅ Secure & private data storage</li>
                </ul>
            </div>

            {/* Call-to-Action Button */}
            <Link to="/dashboard">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
                    Go to Dashboard →
                </button>
            </Link>
        </div>
    );
}

export default HomePage;
