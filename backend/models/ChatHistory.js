const mongoose = require("mongoose");

// ✅ Improved Chat History Schema
const ChatHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // 🔹 Reference to User model (if applicable)
        required: true
    },
    messages: [
        {
            sender: { type: String, required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }, // 🔹 Auto-track creation time
    updatedAt: { type: Date, default: Date.now }  // 🔹 Auto-track last update
});

// ✅ Pre-save middleware to update `updatedAt`
ChatHistorySchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const ChatHistory = mongoose.model("ChatHistory", ChatHistorySchema);

module.exports = ChatHistory;
