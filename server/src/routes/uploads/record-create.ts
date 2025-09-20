// server/src/routes/uploadsRecord.ts
import Upload from "../../models/Upload";
import { Router } from "express";
import { requireAuth, requireApproved, AuthRequest } from "../../middleware/auth";

const router = Router();

// POST /api/uploads/record
router.post(
  "/uploads/record",
  requireAuth,
  requireApproved,
  async (req: AuthRequest, res) => {
    try {
      const { title, description, type, fileKey, sizes } = req.body;

      if (!title || !type || !fileKey) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const upload = new Upload({
        title,
        description,
        type,        // painting or photograph
        fileKey,     // original
        sizes,       // store the key for thumbnail and medium size { thumbnail: "...", medium: "..." }
        owner: req.user.id,
      });

      await upload.save();
      await upload.populate("owner", "firstName lastName");

      res.json(upload);
    } catch (err) {
      console.error("Record upload error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
