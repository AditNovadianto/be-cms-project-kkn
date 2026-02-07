import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getBatasWilayahContents } from "../controllers/batasWilayahController.js";

const router = express.Router();

router.get("/getBatasWilayahContents", verifyToken, getBatasWilayahContents);

export default router;
