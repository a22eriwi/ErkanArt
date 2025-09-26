// server/src/routes/uploads/read-id.ts
import { Router, Response } from "express";
import Upload from "../../models/upload";

const router = Router();

// GET /api/uploads/:id
router.get("/uploads/:id", async (req, res: Response) => {
  try {
    const upload = await Upload.findById(req.params.id)
      .populate("owner", "firstName lastName")
      .lean();

    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }

    const response = {
      _id: upload._id,
      title: upload.title,
      description: upload.description,
      type: upload.type,
      url: `${process.env.R2_PUBLIC_URL}/${upload.fileKey}`,
      sizes: {
        thumbnail: upload.sizes?.thumbnail
          ? `${process.env.R2_PUBLIC_URL}/${upload.sizes.thumbnail}`
          : null,
        medium: upload.sizes?.medium
          ? `${process.env.R2_PUBLIC_URL}/${upload.sizes.medium}`
          : null,
      },
      owner: upload.owner,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching upload:", err);
    res.status(500).json({ message: "Failed to fetch upload" });
  }
});

export default router;