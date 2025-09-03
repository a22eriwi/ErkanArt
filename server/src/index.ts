//server/src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploads";
import adminRoutes from "./routes/admin";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// allow cross-origin requests with cookies
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allow cookies
}));

// connect MongoDB Atlas
connectDB();

app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", adminRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));