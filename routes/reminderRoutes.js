import express from "express";

import { createReminder, getReminders, deleteReminder } from "../controllers/reminderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getReminders);
router.post("/add", protect, createReminder);
router.delete("/:reminderId", protect, deleteReminder);

export default router;
