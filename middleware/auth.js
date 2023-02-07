import jwt from "jsonwebtoken";

import User from "../models/User.js";

// This function cecks whether there is an auth token in the request or not
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "error",
      error: "You are not authorized",
    });
  }

  // Put the current user information in the req object
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  req.user = user;
  next();
};
