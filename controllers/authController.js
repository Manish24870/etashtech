import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

// Function to send a new auth token when user logs in
const sendAuthToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    user,
    token,
  });
};

// Route = POST /auth/register
// Function to register a new user
export const registerUser = async (req, res, next) => {
  // Check if this email is already taken by another user
  const foundEmail = await User.findOne({ email: req.body.email });
  if (foundEmail) {
    return res.status(400).json({
      status: "error",
      error: "This email is taken",
    });
  }

  try {
    // Create the new user and save them
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    sendAuthToken(newUser, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Route = POST /auth/login
// Function to login a user
export const loginUser = async (req, res, next) => {
  // Check if this email is already taken by another user
  const user = await User.findOne({ email: req.body.email });

  // Check the password of the user
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      status: "error",
      error: "The given credentials are invalid",
    });
  }
  sendAuthToken(user, res);

  try {
    await newUser.save();
    sendAuthToken(newUser, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
