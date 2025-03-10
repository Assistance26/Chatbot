import { useState } from "react";
import { analyzeSentiment } from "../services/sentimentService";

function useSentiment() {
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeText = async (text) => {
        setLoading(true);
        try {
            const result = await analyzeSentiment(text);
            setSentiment(result);
        } catch (error) {
            console.error("Sentiment Analysis Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { sentiment, loading, analyzeText };
}

export default useSentiment;
