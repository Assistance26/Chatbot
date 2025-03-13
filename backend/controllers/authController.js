// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator");
// require("dotenv").config(); // Ensure environment variables are loaded

// // User Signup
// exports.signup = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     try {
//         const { name, email, password } = req.body;

//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ msg: "User already exists" });

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         // Generate JWT Token
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // User Login
// exports.login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

//         // Compare hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

//         // Generate JWT Token
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // Get Current User
// exports.getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ msg: "User not found" });

//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// // User Logout (Client-side handled by clearing token)
// exports.logout = (req, res) => {
//     res.status(200).json({ success: true, msg: "User logged out successfully" });
// };
