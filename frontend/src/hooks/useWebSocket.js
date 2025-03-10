import { useEffect, useState } from "react";
import useTensorFlow from "./useTensorFlow"; // AI Model Hook

function useWebSocket(url) {
    const [data, setData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [riskLevel, setRiskLevel] = useState(null);

    const { predictHealthRisk, loading: aiLoading } = useTensorFlow(); // AI Model Hook

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("✅ WebSocket Connected");
            setIsConnected(true);
        };

        socket.onmessage = async (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                setData(parsedData);

                // Run AI prediction if health vitals are received
                if (parsedData?.vitals && !aiLoading) {
                    const result = await predictHealthRisk(parsedData.vitals);
                    if (!result.error) setRiskLevel(result.riskLevel);
                }
            } catch (error) {
                console.error("❌ WebSocket Data Error:", error);
            }
        };

        socket.onerror = (error) => {
            console.error("❌ WebSocket Error:", error);
        };

        socket.onclose = () => {
            console.log("⚠️ WebSocket Disconnected");
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, [url, predictHealthRisk, aiLoading]);

    return { data, riskLevel, isConnected };
}

export default useWebSocket;
