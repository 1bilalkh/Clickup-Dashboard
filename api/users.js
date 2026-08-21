import mongoose from "mongoose";
import User from "../server/models/User.js";

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Users API error:", error);

    return res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
}