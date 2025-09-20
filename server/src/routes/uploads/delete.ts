// server/src/routes/uploads/delete.ts
import Upload from "../../models/Upload";
import { Router } from "express";
import { requireAuth, requireApproved, AuthRequest } from "../../middleware/auth";
import { r2 } from "../../r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const router = Router();

// DELETE /api/uploads/:id
router.delete(
    "/uploads/:id",
    requireAuth,
    requireApproved,
    async (req: AuthRequest, res) => {
        try {
            const upload = await Upload.findOneAndDelete({
                _id: req.params.id,
                owner: req.user.id,
            });
            if (!upload) return res.status(404).json({ error: "Not found" });

            // Delete from R2 (Cloudflare)
            const allKeys = [upload.fileKey, upload.sizes?.thumbnail, upload.sizes?.medium].filter(Boolean);
            for (const key of allKeys) {
                await r2.send(new DeleteObjectCommand({
                    Bucket: process.env.R2_BUCKET,
                    Key: key,
                }));
            }

            res.json({ success: true });
        } catch (err) {
            console.error("Delete error:", err);
            res.status(500).json({ error: "Server error" });
        }
    }
);

export default router;