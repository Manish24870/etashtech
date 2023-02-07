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

// Route = GET /reminders
// Function to fetch all the reminders
export const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ owner: req.user._id });
    res.status(200).json({
      status: "success",
      reminders,
    });
  } catch (err) {
    next(err);
  }
};

// Route = DELETE /reminders/:reminderId
// Function to delete a reminder
export const deleteReminder = async (req, res, next) => {
  try {
    await Reminder.findByIdAndDelete(req.params.reminderId);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
