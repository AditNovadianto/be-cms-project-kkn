import express from "express";
import {
  updateSection,
  uploadHeroImageSection,
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

// Beranda

//

// Demografi

//

// Peta Wilayah

//

// Visi dan Misi

//

// Batas Wilayah

//

// Pemerintahan

//

// Potensi

//

// Sejarah

//

// Wisata

//

// Sarana Prasarana

//

// Galeri

//

// for Beranda, Peta Wilayah, Pemerintahan
router.post(
  "/uploadHeroImageSection/:id_section",
  verifyToken,
  upload.single("image"),
  uploadHeroImageSection,
);
//

// for all sections
router.post("/updateSection/:id_section", verifyToken, updateSection);

export default router;
