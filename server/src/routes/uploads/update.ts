// server/src/routes/uploads/update.ts
import Upload from "../../models/upload";
import { Router } from "express";
import { requireAuth, requireApproved, AuthRequest } from "../../middleware/auth";

const router = Router();

// PUT /api/uploads/:id
router.put(
  "/uploads/:id",
  requireAuth,
  requireApproved,
  async (req: AuthRequest, res) => {
    try {
      const { title, description } = req.body;
      const upload = await Upload.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        { title, description },
        { new: true }
      );
      if (!upload) return res.status(404).json({ error: "Not found" });
      res.json(upload);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
