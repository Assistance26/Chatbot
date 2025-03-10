// services/notificationService.js - Notification Serviceconst nodemailer = require("nodemailer");
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = require("../config/serverConfig");

const sendNotification = async (to, subject, message) => {
    try {
        let transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: EMAIL_USER,
            to,
            subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log(`📩 Notification sent to ${to}`);
    } catch (error) {
        console.error("❌ Notification Error:", error);
    }
};

module.exports = { sendNotification };
