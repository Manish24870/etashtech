import express from "express";

import {
  createReminder,
  getReminders,
  deleteReminder,
  getReminder,
  editReminder,
} from "../controllers/reminderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getReminders);
router.get("/:reminderId", protect, getReminder);
router.post("/add", protect, createReminder);
router.delete("/:reminderId", protect, deleteReminder);
router.patch("/:reminderId/edit", protect, editReminder);

export default router;
