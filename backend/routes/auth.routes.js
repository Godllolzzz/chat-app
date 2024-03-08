import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js"; // Corrected import path

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/signup", signupUser); // Use POST for signup
export default router;
