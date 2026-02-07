import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getVisiMisiContents } from "../controllers/visiMisiController.js";

const router = express.Router();

router.get("/getVisiMisiContents", verifyToken, getVisiMisiContents);

export default router;
