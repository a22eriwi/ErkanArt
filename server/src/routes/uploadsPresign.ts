// server/src/routes/uploadsPresign.ts
import { Router } from "express";
import { requireAuth, requireApproved, AuthRequest } from "../middleware/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, R2_BUCKET } from "../r2";
import { nanoid } from "nanoid";
import { z } from "zod";

const router = Router();

// validate request body
const UploadSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  ext: z.enum(["jpg", "jpeg", "png", "webp"]),
});

// POST /api/uploads/presign
router.post(
  "/uploads/presign",
  requireAuth,
  requireApproved,
  async (req: AuthRequest, res) => {
    try {
      const { contentType, ext } = UploadSchema.parse(req.body);

      // create unique key for this user
      const userId = req.user.id;
      const key = `users/${userId}/${nanoid(5)}.${ext}`;

      const cmd = new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      });

      // presigned PUT url, expires in 4 min
      const url = await getSignedUrl(r2, cmd, { expiresIn: 240 });

      res.json({ url, key });
    } catch (err) {
      console.error("Presign error:", err);
      res.status(400).json({ error: "Invalid request" });
    }
  }
);

export default router;
