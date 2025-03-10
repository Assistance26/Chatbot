// const SENTIMENT_API_URL = "https://api.sentimentanalysis.com/analyze";

// export async function analyzeSentiment(text, retries = 3, timeout = 8000) {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const timeoutId = setTimeout(() => {
//         controller.abort();
//         console.warn("⏳ Sentiment analysis request timed out and was aborted.");
//     }, timeout);

//     try {
//         const response = await fetch(SENTIMENT_API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ text }),
//             signal,
//         });

//         clearTimeout(timeoutId);

//         if (!response.ok) {
//             throw new Error(`API error (${response.status}): ${response.statusText}`);
//         }

//         const data = await response.json();
//         if (!data.sentiment) {
//             throw new Error("Invalid API response: 'sentiment' field missing.");
//         }

//         return data.sentiment; // Expected response: "positive", "negative", "neutral"
//     } catch (error) {
//         clearTimeout(timeoutId); // Ensure timeout is cleared on error

//         if (error.name === "AbortError") {
//             console.error("⚠️ Sentiment analysis request aborted due to timeout.");
//         } else {
//             console.error("❌ Sentiment Analysis Error:", error.message);
//         }

//         if (retries > 0 && error.name !== "AbortError") {
//             console.warn(`🔄 Retrying sentiment analysis... Attempts left: ${retries - 1}`);
//             return analyzeSentiment(text, retries - 1, timeout);
//         }

//         return "error"; // Fallback response for consistent handling
//     }
// }
