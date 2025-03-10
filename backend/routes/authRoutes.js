const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post(
    "/signup",
    [
        body("name").not().isEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    ],
    authController.signup
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").not().isEmpty().withMessage("Password is required")
    ],
    authController.login
);

router.get("/user", authMiddleware, authController.getUser); // Ensure correct function name

module.exports = router;
