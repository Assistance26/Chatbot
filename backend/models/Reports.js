const mongoose = require('mongoose');
// Reports Schema
const ReportsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    reportType: String, // weekly or monthly
    content: String,
    dateGenerated: { type: Date, default: Date.now }
  });
  const Reports = mongoose.model('Reports', ReportsSchema);
  module.exports = Reports;