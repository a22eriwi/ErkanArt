// server/src/routes/admin.ts
import { Router } from "express";
import User from "../models/User";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/admin/users/:id/approve", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User approved", user });
  } catch (err) {
    console.error("Error approving user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;