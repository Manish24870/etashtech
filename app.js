import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/authRoutes";

const app = express();

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/book-trading-app", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

// Mount the routes
app.use("/auth", authRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(400).json({
    status: "error",
    error: err,
  });
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
