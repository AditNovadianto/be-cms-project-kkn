import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getGalleryContents,
  uploadGalleryImageSection,
} from "../controllers/galeriController.js";
import multer from "multer";

const router = express.Router();

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

router.get("/getGalleryContents", verifyToken, getGalleryContents);

router.post(
  "/uploadGalleryImageSection/:id_section",
  verifyToken,
  upload.single("image"),
  uploadGalleryImageSection,
);

export default router;
