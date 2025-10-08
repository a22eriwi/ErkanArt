// server/src/routes/uploads/visibility-update.ts
import { Router, Response } from "express";
import Upload from "../../models/upload";
import { requireAuth, AuthRequest } from "../../middleware/auth";

const router = Router();

router.patch("/uploads/:id/visibility", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const upload = await Upload.findOne({ _id: req.params.id, owner: req.user.id });
    if (!upload) return res.status(404).json({ message: "Not found" });

    upload.isPublic = req.body.isPublic;
    await upload.save();

    res.json({ success: true, isPublic: upload.isPublic });
  } catch (err) {
    console.error("Error toggling visibility:", err);
    res.status(500).json({ message: "Failed to toggle visibility" });
  }
});

export default router;