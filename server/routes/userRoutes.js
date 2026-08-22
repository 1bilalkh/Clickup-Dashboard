import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.create({
      name,
      email,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});


// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
});



export default router;