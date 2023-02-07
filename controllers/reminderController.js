import Reminder from "../models/Reminder.js";

// Route = POST /reminders/add
// Function to create a new reminder
export const createReminder = async (req, res, next) => {
  try {
    const newReminder = new Reminder({
      title: req.body.title,
      description: req.body.description,
      reminderDate: req.body.reminderDate,
      owner: req.user._id,
    });
    await newReminder.save();
    res.status(200).json({
      status: "success",
      reminder: newReminder,
    });
  } catch (err) {
    next(err);
  }
};
