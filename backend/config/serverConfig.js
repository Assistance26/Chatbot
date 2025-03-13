require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/healthAI",
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY, // 🔹 Replaced OpenAI with Hugging Face
    EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
};
