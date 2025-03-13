require("dotenv").config();

module.exports = {
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY || "",
    TWILIO_SID: process.env.TWILIO_SID || "",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
};
