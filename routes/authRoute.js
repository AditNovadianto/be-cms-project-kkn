import express from "express";
import { signUp, signIn, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signUpUsers", signUp);
router.post("/signInUsers", signIn);
router.get("/getAllUsers", getAllUsers);

export default router;
