import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPotensiContents } from "../controllers/potensiController.js";

const router = express.Router();

router.get("/getPotensiContents", verifyToken, getPotensiContents);

export default router;
