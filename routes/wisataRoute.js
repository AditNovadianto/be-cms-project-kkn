import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getWisataContents,
  uploadImageWisataSection,
} from "../controllers/wisataController.js";
import multer from "multer";

const router = express.Router();

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

router.get("/getWisataContents", verifyToken, getWisataContents);

router.post(
  "/uploadImageWisataSection/:id_section",
  verifyToken,
  upload.single("image"),
  uploadImageWisataSection,
);

export default router;
