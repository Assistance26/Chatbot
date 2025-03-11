const jwt = require("jsonwebtoken");
const { JWT_SECRET,JWT_EXPIRES_IN } = require("../config/serverConfig");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("🔑 Received Authorization Header:", authHeader); // ✅ Debug received token

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("🚫 No token provided or incorrect format.");
            return res.status(401).json({ success: false, message: "Access Denied. No Token Provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        console.log("🔑 Extracted Token:", token); // ✅ Debug extracted token

        // Verify the token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("❌ Token verification failed:", err.message);
                return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
            }
            
            console.log("✅ Decoded Token Data:", decoded); // ✅ Debug decoded token
            req.user = decoded; // Attach decoded user info to request
            next();
        });

    } catch (error) {
        console.error("❌ Error in authMiddleware:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

module.exports = authMiddleware;
