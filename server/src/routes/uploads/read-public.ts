// server/src/routes/read-public.ts
import { Router, Response } from "express";
import Upload from "../../models/upload";
import { IUser } from "../../models/user";
import Favorite from "../../models/favorite";
import { requireAuthOptional } from "../../middleware/authOptional";
import type { AuthRequest } from "../../middleware/auth";

const router = Router();

// GET /api/uploads/public
router.get("/uploads/public", requireAuthOptional, async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.query;
    const query: any = { isPublic: true };
    if (type) query.type = type;

    const uploads = await Upload.find(query)
      .sort({ createdAt: -1 })
      .populate<{ owner: IUser }>("owner", "firstName lastName")
      .lean(); // plain JS objects (not mongoose docs)

    let userFavorites: string[] = [];
    if (req.user) {
      const favs = await Favorite.find({ user: req.user._id }).select("upload").lean();
      userFavorites = favs.map((f) => f.upload.toString());
    }
    console.log("User:", req.user?._id);
    console.log("User favorites:", userFavorites);
    console.log("First upload id:", uploads[0]?._id.toString());

    const response = uploads.map((u) => ({
      _id: u._id,
      title: u.title,
      description: u.description,
      type: u.type,
      url: `${process.env.R2_PUBLIC_URL}/${u.fileKey}`,
      isPublic: u.isPublic,
      isFavorited: userFavorites.includes(u._id.toString()),
      sizes: {
        thumbnail: u.sizes?.thumbnail ? `${process.env.R2_PUBLIC_URL}/${u.sizes.thumbnail}` : null,
        medium: u.sizes?.medium ? `${process.env.R2_PUBLIC_URL}/${u.sizes.medium}` : null,
      },
      owner: u.owner,
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

export default router;