import { useState } from "react";
import { analyzeSentiment } from "../hooks/useSentiment";

function MoodTracker() {
    const [mood, setMood] = useState("");
    const [analysis, setAnalysis] = useState("");

    const handleMoodCheck = async () => {
        const result = await analyzeSentiment(mood);
        setAnalysis(result);
    };

    return (
        <div className="container">
            <h1>Mood Tracker</h1>
            <textarea
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="How are you feeling today?"
            />
            <button onClick={handleMoodCheck} className="btn-primary">Analyze Mood</button>
            {analysis && <p>Sentiment Analysis: {analysis}</p>}
        </div>
    );
}

export default MoodTracker;
