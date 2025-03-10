const mongoose = require('mongoose');
// Health Data Schema
const HealthDataSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    heartRate: Number,
    steps: Number,
    sleepHours: Number,
    date: { type: Date, default: Date.now }
  });
  const HealthData = mongoose.model('HealthData', HealthDataSchema);
  module.exports = HealthData;