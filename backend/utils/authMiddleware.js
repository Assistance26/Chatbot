const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access Denied. No Token Provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

module.exports = authMiddleware;
