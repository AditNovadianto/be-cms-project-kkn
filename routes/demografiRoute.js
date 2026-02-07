import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getDemografiContents } from "../controllers/demografiController.js";

const router = express.Router();

router.get("/getDemografiContents", verifyToken, getDemografiContents);

export default router;
