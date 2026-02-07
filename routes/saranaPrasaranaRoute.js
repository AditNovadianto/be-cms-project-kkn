import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getSaranaPrasaranaContents,
  uploadImageSaranaPrasaranaSection,
} from "../controllers/saranaPrasaranaController.js";
import multer from "multer";

const router = express.Router();

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

router.get(
  "/getSaranaPrasaranaContents",
  verifyToken,
  getSaranaPrasaranaContents,
);

router.post(
  "/uploadImageSaranaPrasaranaSection/:id_section",
  verifyToken,
  upload.single("image"),
  uploadImageSaranaPrasaranaSection,
);

export default router;
