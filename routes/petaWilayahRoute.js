import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPetaWilayahContents } from "../controllers/petaWilayahController.js";

const router = express.Router();

router.get("/getPetaWilayahContents", verifyToken, getPetaWilayahContents);

export default router;
