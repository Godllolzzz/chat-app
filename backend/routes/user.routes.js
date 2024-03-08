import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protecRoute.js"; // Corrected import path
import { getUsersForSideBar } from "../controllers/user.controller.js"; // Corrected import path

router.get("/", protectRoute, getUsersForSideBar);
export default router;
