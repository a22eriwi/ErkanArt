// server/src/routes/uploads/favorite-update.ts
import { Router, Response } from "express";
import { requireAuth, AuthRequest } from "../../middleware/auth";
import Favorite from "../../models/favorite";

const router = Router();

// PATCH /api/uploads/:id/favorite
router.patch("/uploads/:id/favorite", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await Favorite.findOne({ user: req.user.id, upload: req.params.id });

    if (existing) {
      await existing.deleteOne();
      return res.json({ favorited: false });
    } else {
      await Favorite.create({ user: req.user.id, upload: req.params.id });
      return res.json({ favorited: true });
    }
  } catch (err) {
    console.error("Error toggling favorite:", err);
    res.status(500).json({ message: "Failed to toggle favorite" });
  }
});

export default router;