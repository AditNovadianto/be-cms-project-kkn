import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getBerandaContents } from "../controllers/berandaController.js";

const router = express.Router();

router.get("/getBerandaContents", verifyToken, getBerandaContents);

export default router;
