import express from "express";
import Consultation from "../models/Consultation.js";

const router = express.Router();

// ==========================================
// CREATE CONSULTATION
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      time,
      consultationType,
      message,
    } = req.body;

    const consultation = await Consultation.create({
      name,
      email,
      phone,
      date,
      time,
      consultationType,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Consultation booked successfully",
      consultation,
    });
  } catch (error) {
    console.error("Create consultation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to book consultation",
    });
  }
});

// ==========================================
// GET ALL CONSULTATIONS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ createdAt: -1 });

    res.json(consultations);
  } catch (error) {
    console.error("Get consultations error:", error);

    res.status(500).json({
      message: "Failed to fetch consultations",
    });
  }
});

// ==========================================
// GET CONSULTATION COUNT
// ==========================================

router.get("/count", async (req, res) => {
  try {
    const count = await Consultation.countDocuments();

    res.json({
      count,
    });
  } catch (error) {
    console.error("Consultation count error:", error);

    res.status(500).json({
      message: "Failed to get consultation count",
    });
  }
});

export default router;