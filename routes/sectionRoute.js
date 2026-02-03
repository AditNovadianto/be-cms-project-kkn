import express from "express";
import {
  updateSection,
  uploadImageSection,
} from "../controllers/sectionController.js";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

router.post("/updateSection/:id_section", verifyToken, updateSection);
router.post(
  "/uploadImageSection/:id_section",
  verifyToken,
  upload.single("image"),
  uploadImageSection,
);

export default router;
