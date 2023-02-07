import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reminderDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
