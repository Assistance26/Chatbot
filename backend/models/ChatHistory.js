const mongoose = require('mongoose');
// Chat History Schema
const ChatHistorySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    messages: [{
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now }
    }]
  });
  const ChatHistory = mongoose.model('ChatHistory', ChatHistorySchema);
  module.exports = ChatHistory;