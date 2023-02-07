import express from "express";

import { createReminder } from "../controllers/reminderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", protect, createReminder);

export default router;
