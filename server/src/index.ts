//server/src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import cookieParser from "cookie-parser";

// routes/auth
import authRoutes from "./routes/auth/authRoutes";

// routes/uploads
import uploadsPresignCreate from "./routes/uploads/presign-create";
import uploadsRecordCreate from "./routes/uploads/record-create";
import uploadsReadUser from "./routes/uploads/read-user";
import uploadsReadPublic from "./routes/uploads/read-public";
import uploadsId from "./routes/uploads/read-id";
import uploadsUpdate from "./routes/uploads/update";
import uploadsDelete from "./routes/uploads/delete";
import uploadsVisibilityUpdate from "./routes/uploads/visibility-update";
import favoriteUpdate from "./routes/uploads/favorite-update";


// routes/admin
import adminRoutes from "./routes/admin/admin";

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

// routes/auth
app.use("/api", authRoutes);

// routes/uploads
app.use("/api", uploadsPresignCreate);
app.use("/api", uploadsRecordCreate);
app.use("/api", uploadsReadUser);
app.use("/api", uploadsReadPublic);
app.use("/api", uploadsUpdate);
app.use("/api", uploadsDelete);
app.use("/api", uploadsId);
app.use("/api", uploadsVisibilityUpdate);
app.use("/api", favoriteUpdate);

// routes/admin
app.use("/api", adminRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));