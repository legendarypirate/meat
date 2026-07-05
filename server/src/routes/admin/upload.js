import { Router } from "express";
import multer from "multer";
import cloudinary, { isCloudinaryConfigured } from "../../config/cloudinary.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({
        error: "Cloudinary is not configured. Set CLOUDINARY_* in server/.env",
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const folder = process.env.CLOUDINARY_FOLDER || "meat/products";

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        },
      );
      stream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:publicId", async (req, res, next) => {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({ error: "Cloudinary is not configured" });
    }

    const publicId = decodeURIComponent(req.params.publicId);
    await cloudinary.uploader.destroy(publicId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
