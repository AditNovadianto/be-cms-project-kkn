import express from "express";
import {
  signUp,
  signIn,
  getAllUsers,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signUpUsers", signUp);
router.post("/signInUsers", signIn);
router.get("/getAllUsers", getAllUsers);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;
