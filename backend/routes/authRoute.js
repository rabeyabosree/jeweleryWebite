const express = require("express");
const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require("nodemailer");
const upload = require('../utility/multer')

// JWT secret
const JWT_SECRET = process.env.SECRET_KEY || "your_jwt_secret";
const JWT_EXPIRE = "7d";

// Helper: generate token
const generateToken = (user) => {
    return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });

        // Create user
        const user = await User.create({ name, email, password });

        const token = generateToken(user);
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- UPLOAD PROFILE AVATAR --------------------
router.post("/profile", upload.single("profile"), async (req, res) => {
    try {
        const { userId } = req.body; // you can send userId in body or get from token
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

       user.profile = req.file.path;
        await user.save();

        res.status(200).json({
            message: "Profile updated",
            // profile: user.profile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- FORGOT PASSWORD --------------------
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate OTP (6-digit)
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetOTP = otp;
        user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 min
        await user.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // use your SMTP host
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // app password or email password
            },
        });

        // Send OTP via email
        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP for Password Reset",
            html: `<p>Your OTP for password reset is: <b>${otp}</b></p><p>This OTP is valid for 10 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- VERIFY OTP --------------------
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.resetOTP != otp || Date.now() > user.otpExpire)
            return res.status(400).json({ message: "Invalid or expired OTP" });

        res.status(200).json({ message: "OTP verified, you can reset password" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- RESET PASSWORD --------------------
router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = newPassword; // pre-save hook will hash it
        user.resetOTP = null;
        user.otpExpire = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
