import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protecRoute.js"; // Corrected import path
import { sendMessage, getMessage } from "../controllers/message.controller.js"; // Corrected import path

router.get("/:id", protectRoute, getMessage);
router.post("/sent/:id", protectRoute, sendMessage);
export default router;
