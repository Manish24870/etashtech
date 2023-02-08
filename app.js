import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { CronJob } from "cron";

import Reminder from "./models/Reminder.js";

dotenv.config();

// Create a new socket server
const io = new Server(8900, { cors: { origin: "*" } });

import authRouter from "./routes/authRoutes.js";
import reminderRouter from "./routes/reminderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/etashtech-work", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

// Mount the routes
app.use("/auth", authRouter);
app.use("/reminders", reminderRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(400).json({
    status: "error",
    error: err,
  });
});

// Socket IO for sending notifications on reminder deadline
io.on("connection", (socket) => {
  console.log("CONNECTED");
  // Create a reminder job when user creates a new reminder
  socket.on("createReminderJob", (reminder) => {
    new CronJob(
      new Date(reminder.reminderDate),
      async () => {
        const reminder2 = await Reminder.findById(reminder._id);
        reminder2.status = "completed";
        await reminder2.save();
        io.emit("jobCompleted", reminder2);
      },
      null,
      true
    );
  });
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
