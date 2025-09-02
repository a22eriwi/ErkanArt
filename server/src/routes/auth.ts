// server/src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

// POST /api/register
// Creates a new user with isApproved = false by default
router.post("/register", async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }

        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // save new user
        const user = new User({
            email,
            firstName,
            lastName,
            passwordHash,
            isApproved: false,
            role: "user",
        });
        await user.save();

        res.json({ message: "User registered, waiting for approval." });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// POST /api/login
// Validates credentials and returns a JWT
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "No accounts with this email exists" });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        // sign JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
                isApproved: user.isApproved,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isApproved: user.isApproved,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
