// src/services/sentimentService.js
export async function analyzeSentiment(text) {
    try {
        const response = await fetch("https://api.sentimentanalysis.com/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        return data.sentiment; // Example: "positive", "negative", "neutral"
    } catch (error) {
        console.error("Sentiment analysis failed:", error);
        return "error"; // Fallback response
    }
}
