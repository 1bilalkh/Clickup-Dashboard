import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// GET all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({
      createdAt: -1,
    });

    res.json(registrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);

    res.status(500).json({
      message: "Failed to fetch registrations",
    });
  }
});

// POST new registration
router.post("/", async (req, res) => {
  try {
    const registration = new Registration(req.body);

    const savedRegistration = await registration.save();

    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error("Failed to create registration:", error);

    res.status(500).json({
      message: "Failed to create registration",
    });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Registration.countDocuments();

    res.json({ count });
  } catch (error) {
    console.error("Registration count error:", error);

    res.status(500).json({
      message: "Failed to get registration count",
    });
  }
});


export default router;