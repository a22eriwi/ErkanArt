// server/src/routes/read-user.ts
import { Router, Response } from "express";
import { requireAuth, AuthRequest } from "../../middleware/auth";
import Upload from "../../models/upload";
import { IUser } from "../../models/user";

const router = Router();

// GET /api/uploads/user
router.get("/uploads/user", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.query;
    const userId = req.user.id; // comes from JWT payload

    const query: any = { owner: userId };
    if (type) query.type = type;

    const uploads = await Upload.find(query)
      .sort({ createdAt: -1 })
      .populate<{ owner: IUser }>("owner", "firstName lastName");

    const response = uploads.map((u) => ({
      _id: u._id,
      title: u.title,
      description: u.description,
      type: u.type,
      url: `${process.env.R2_PUBLIC_URL}/${u.fileKey}`,  // original
      sizes: {
        thumbnail: u.sizes?.thumbnail ? `${process.env.R2_PUBLIC_URL}/${u.sizes.thumbnail}` : null,
        medium: u.sizes?.medium ? `${process.env.R2_PUBLIC_URL}/${u.sizes.medium}` : null,
      },
       owner: u.owner, // populate owner
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

export default router;