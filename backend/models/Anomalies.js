const mongoose = require('mongoose');
// Anomalies Schema
const AnomaliesSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    anomalyType: String,
    details: String,
    timestamp: { type: Date, default: Date.now }
  });
  const Anomalies = mongoose.model('Anomalies', AnomaliesSchema);
  module.exports = Anomalies;