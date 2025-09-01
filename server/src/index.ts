//server/src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { r2, R2_BUCKET } from './r2';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
