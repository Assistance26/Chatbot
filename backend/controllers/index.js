// /controllers/index.js

const authController = require("./authController");
const healthController = require("./healthController");
const chatbotController = require(".");
const reportsController = require("./reportsController");
const alertsController = require("./alertsController");
const anomalyController = require("./anomalyController");
const sentimentController = require("./sentimentController");
const websocketController = require("./websocketController");

module.exports = {
    authController,
    healthController,
    chatbotController,
    reportsController,
    alertsController,
    anomalyController,
    sentimentController,
    websocketController
};
