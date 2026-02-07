import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPemerintahanContents } from "../controllers/pemerintahanController.js";

const router = express.Router();

router.get("/getPemerintahanContents", verifyToken, getPemerintahanContents);

export default router;
