import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

// Global model cache
let sentimentModel = null;
let trainedModel = null; // Trained classifier

function useSentiment() {
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [training, setTraining] = useState(false);

    useEffect(() => {
        const loadModel = async () => {
            if (!sentimentModel) {
                try {
                    console.log("⏳ Loading USE Model...");
                    sentimentModel = await use.load();
                    console.log("✅ USE Model Loaded Successfully!");
                } catch (error) {
                    console.error("❌ Error loading model:", error);
                }
            }
            setLoading(false);
        };

        loadModel();
    }, []);

    // Expanded Healthcare Dataset for Training
    const trainingData = [
        // Positive Sentiments
        { text: "I feel great today!", label: [1, 0, 0] },
        { text: "My therapy session was really helpful.", label: [1, 0, 0] },
        { text: "The medication is working well for me.", label: [1, 0, 0] },
        { text: "I'm getting better every day!", label: [1, 0, 0] },
        { text: "My doctor was very kind and supportive.", label: [1, 0, 0] },

        // Negative Sentiments (Mental Health, Anxiety, Depression)
        { text: "I'm feeling really down today.", label: [0, 1, 0] },
        { text: "I'm struggling with my anxiety again.", label: [0, 1, 0] },
        { text: "My pain is getting worse.", label: [0, 1, 0] },
        { text: "I feel hopeless and lost.", label: [0, 1, 0] },
        { text: "I keep having panic attacks.", label: [0, 1, 0] },
        { text: "My sleep has been terrible lately.", label: [0, 1, 0] },

        // Neutral Sentiments (General Statements)
        { text: "I had my regular check-up today.", label: [0, 0, 1] },
        { text: "The doctor prescribed new medicine.", label: [0, 0, 1] },
        { text: "I visited the hospital for some tests.", label: [0, 0, 1] },
        { text: "I'm waiting for my lab results.", label: [0, 0, 1] },
        { text: "I'm going for physiotherapy sessions.", label: [0, 0, 1] },
    ];

    // Train the model
    const trainModel = async () => {
        if (!sentimentModel) return;
        setTraining(true);

        try {
            console.log("⏳ Training Model...");

            // Convert text into embeddings
            const texts = trainingData.map(d => d.text);
            const labels = trainingData.map(d => d.label);

            const embeddings = await sentimentModel.embed(texts);
            const xs = embeddings.arraySync();
            const ys = tf.tensor2d(labels);

            // Define model
            trainedModel = tf.sequential();
            trainedModel.add(tf.layers.dense({ inputShape: [512], units: 16, activation: "relu" }));
            trainedModel.add(tf.layers.dense({ units: 3, activation: "softmax" }));

            trainedModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

            // Train model
            await trainedModel.fit(tf.tensor2d(xs), ys, { epochs: 10 });

            console.log("✅ Model Trained Successfully!");
        } catch (error) {
            console.error("❌ Error during training:", error);
        } finally {
            setTraining(false);
        }
    };

    // Analyze sentiment
    const analyzeText = async (text) => {
        if (!sentimentModel || !trainedModel) {
            console.warn("⚠️ Model not trained yet.");
            return;
        }

        setLoading(true);
        try {
            const embedding = await sentimentModel.embed([text]);
            const inputTensor = tf.tensor2d(embedding.arraySync());

            // Get prediction
            const prediction = trainedModel.predict(inputTensor);
            const scores = prediction.arraySync()[0];

            const labels = ["Positive 😊", "Negative 😞", "Neutral 😐"];
            const maxIndex = scores.indexOf(Math.max(...scores));

            setSentiment(labels[maxIndex]);
        } catch (error) {
            console.error("❌ Sentiment Analysis Error:", error);
            setSentiment("Error ❌");
        } finally {
            setLoading(false);
        }
    };

    return { sentiment, loading, training, analyzeText, trainModel };
}

export default useSentiment;
