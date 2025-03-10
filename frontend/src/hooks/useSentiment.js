// import { useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as use from "@tensorflow-models/universal-sentence-encoder";

// // Global model cache
// let sentimentModel = null;
// let trainedModel = null;

// function useSentiment() {
//     const [sentiment, setSentiment] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [training, setTraining] = useState(false);

//     useEffect(() => {
//         const loadModel = async () => {
//             if (!sentimentModel) {
//                 try {
//                     console.log("⏳ Loading USE Model...");
//                     sentimentModel = await use.load();
//                     console.log("✅ USE Model Loaded Successfully!");
//                 } catch (error) {
//                     console.error("❌ Error loading model:", error);
//                 }
//             }
//             setLoading(false);
//         };

//         loadModel();
//     }, []);

//     const trainingData = [
//         { text: "I feel great today!", label: [1, 0, 0] },
//         { text: "My therapy session was really helpful.", label: [1, 0, 0] },
//         { text: "The medication is working well for me.", label: [1, 0, 0] },
//         { text: "I'm getting better every day!", label: [1, 0, 0] },
//         { text: "My doctor was very kind and supportive.", label: [1, 0, 0] },
//         { text: "I'm feeling really down today.", label: [0, 1, 0] },
//         { text: "I'm struggling with my anxiety again.", label: [0, 1, 0] },
//         { text: "My pain is getting worse.", label: [0, 1, 0] },
//         { text: "I feel hopeless and lost.", label: [0, 1, 0] },
//         { text: "I keep having panic attacks.", label: [0, 1, 0] },
//         { text: "My sleep has been terrible lately.", label: [0, 1, 0] },
//         { text: "I had my regular check-up today.", label: [0, 0, 1] },
//         { text: "The doctor prescribed new medicine.", label: [0, 0, 1] },
//         { text: "I visited the hospital for some tests.", label: [0, 0, 1] },
//         { text: "I'm waiting for my lab results.", label: [0, 0, 1] },
//         { text: "I'm going for physiotherapy sessions.", label: [0, 0, 1] },
//     ];

//     const trainModel = async () => {
//         if (!sentimentModel || trainedModel) return;
//         setTraining(true);

//         try {
//             console.log("⏳ Training Model...");

//             const texts = trainingData.map(d => d.text);
//             const labels = trainingData.map(d => d.label);

//             const embeddings = await sentimentModel.embed(texts);
//             const xs = tf.tensor2d(embeddings.arraySync());
//             const ys = tf.tensor2d(labels);

//             trainedModel = tf.sequential();
//             trainedModel.add(tf.layers.dense({ inputShape: [512], units: 16, activation: "relu" }));
//             trainedModel.add(tf.layers.dense({ units: 3, activation: "softmax" }));
//             trainedModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

//             await trainedModel.fit(xs, ys, { epochs: 10 });
//             console.log("✅ Model Trained Successfully!");
//         } catch (error) {
//             console.error("❌ Error during training:", error);
//         } finally {
//             setTraining(false);
//         }
//     };

//     const analyzeText = async (text) => {
//         if (!sentimentModel || !trainedModel) {
//             console.warn("⚠️ Model not trained yet. Please train the model first.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const embedding = await sentimentModel.embed([text]);
//             const inputTensor = tf.tensor2d(embedding.arraySync());

//             const prediction = trainedModel.predict(inputTensor);
//             const scores = await prediction.array();

//             const labels = ["Positive 😊", "Negative 😞", "Neutral 😐"];
//             const maxIndex = scores[0].indexOf(Math.max(...scores[0]));

//             setSentiment(labels[maxIndex]);
//         } catch (error) {
//             console.error("❌ Sentiment Analysis Error:", error);
//             setSentiment("Error ❌");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { sentiment, loading, training, analyzeText, trainModel };
// }

// export default useSentiment;


import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

// Global model cache
let sentimentModel = null;
let trainedModel = null;

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
    const trainingData = [
        // Positive Sentiments (Happy, Encouraging, Motivated)
        { text: "I feel great today!", label: [1, 0, 0] },
        { text: "My therapy session was really helpful.", label: [1, 0, 0] },
        { text: "I'm feeling happy and confident.", label: [1, 0, 0] },
        { text: "I finally finished my workout and feel amazing!", label: [1, 0, 0] },
        { text: "Had a wonderful conversation with my friend.", label: [1, 0, 0] },
        { text: "Meditation has been helping me feel calm and centered.", label: [1, 0, 0] },
        { text: "I'm feeling stronger every day!", label: [1, 0, 0] },
        { text: "Today was productive and fulfilling.", label: [1, 0, 0] },
        { text: "I got a good night's sleep and feel refreshed.", label: [1, 0, 0] },
        { text: "I had an amazing day at work!", label: [1, 0, 0] },
    
        // Negative Sentiments (Anxiety, Depression, Stress)
        { text: "I'm feeling really down today.", label: [0, 1, 0] },
        { text: "I keep having panic attacks.", label: [0, 1, 0] },
        { text: "I'm feeling exhausted and overwhelmed.", label: [0, 1, 0] },
        { text: "No one understands how hard this is for me.", label: [0, 1, 0] },
        { text: "I'm struggling with my anxiety a lot lately.", label: [0, 1, 0] },
        { text: "I just feel so alone.", label: [0, 1, 0] },
        { text: "I don't have the energy to do anything.", label: [0, 1, 0] },
        { text: "Life feels meaningless right now.", label: [0, 1, 0] },
        { text: "I can't sleep because my mind won't stop racing.", label: [0, 1, 0] },
        { text: "I'm worried that things will never get better.", label: [0, 1, 0] },
    
        // Neutral Sentiments (Informational, Objective, General)
        { text: "I had my regular check-up today.", label: [0, 0, 1] },
        { text: "I'm waiting for my lab results.", label: [0, 0, 1] },
        { text: "I went to the doctor for a routine visit.", label: [0, 0, 1] },
        { text: "I need to pick up my prescription later.", label: [0, 0, 1] },
        { text: "I have an appointment scheduled next week.", label: [0, 0, 1] },
        { text: "I started a new medication today.", label: [0, 0, 1] },
        { text: "I read an interesting article about mental health.", label: [0, 0, 1] },
        { text: "My therapist suggested journaling.", label: [0, 0, 1] },
        { text: "I tracked my mood over the past week.", label: [0, 0, 1] },
        { text: "I'm considering switching to a new doctor.", label: [0, 0, 1] },
    ];
    

    const trainModel = async () => {
        if (!sentimentModel || trainedModel) return;
        setTraining(true);

        try {
            console.log("⏳ Training Model...");

            const texts = trainingData.map(d => d.text);
            const labels = trainingData.map(d => d.label);

            const embeddings = await sentimentModel.embed(texts);
            const xs = tf.tensor2d(embeddings.arraySync());
            const ys = tf.tensor2d(labels);

            trainedModel = tf.sequential();
            trainedModel.add(tf.layers.dense({ inputShape: [512], units: 16, activation: "relu" }));
            trainedModel.add(tf.layers.dense({ units: 3, activation: "softmax" }));
            trainedModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

            await trainedModel.fit(xs, ys, { epochs: 10 });
            console.log("✅ Model Trained Successfully!");
        } catch (error) {
            console.error("❌ Error during training:", error);
        } finally {
            setTraining(false);
        }
    };

    const analyzeText = async (text) => {
        if (!sentimentModel) {
            console.warn("⚠️ Model not loaded yet.");
            return;
        }

        if (!trainedModel) {
            console.warn("⚠️ Model not trained yet. Training now...");
            await trainModel(); // Automatically train the model
        }

        setLoading(true);
        try {
            const embedding = await sentimentModel.embed([text]);
            const inputTensor = tf.tensor2d(embedding.arraySync());

            const prediction = trainedModel.predict(inputTensor);
            const scores = await prediction.array();

            const labels = ["Positive 😊", "Negative 😞", "Neutral 😐"];
            const maxIndex = scores[0].indexOf(Math.max(...scores[0]));

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
