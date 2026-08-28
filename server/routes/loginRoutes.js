import express from "express";
import LoginActivity from "../models/LoginActivity.js";
import User from "../models/User.js";

const router = express.Router();

// ===============================
// RECORD LOGIN
// ===============================
router.post("/", async (req, res) => {
  try {
    const { clerkId, sessionId } = req.body;

    if (!clerkId || !sessionId) {
      return res.status(400).json({
        message: "Clerk ID and session ID are required",
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

   const login = await LoginActivity.findOneAndUpdate(
  { sessionId },
  {
    user: user._id,
    clerkId,
    sessionId,
    loginAt: new Date(),
  },
  {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  }
);


    res.status(200).json({
      message: "Login activity recorded",
      login,
    });
  } catch (error) {
    console.error("❌ Login activity error:", error);

    res.status(500).json({
      message: "Failed to record login",
      error: error.message,
    });
  }
});

// ===============================
// GET LOGIN ACTIVITY
// ===============================
router.get("/", async (req, res) => {
  try {
    const activities = await LoginActivity.find()
      .populate("user", "name email")
      .sort({ loginAt: 1 });

    res.status(200).json(activities);
  } catch (error) {
    console.error("❌ Get login activity error:", error);

    res.status(500).json({
      message: "Failed to fetch login activity",
      error: error.message,
    });
  }
});

export default router;