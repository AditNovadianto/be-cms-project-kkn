import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getSejarahContents } from "../controllers/sejarahController.js";

const router = express.Router();

router.get("/getSejarahContents", verifyToken, getSejarahContents);

export default router;
