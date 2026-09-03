import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// =====================================================
// GET ALL TASKS
// =====================================================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
});

// =====================================================
// CREATE TASK
// =====================================================
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE TASK
// =====================================================
// =====================================================
// GET TASKS BY PROJECT
// =====================================================
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get project tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch project tasks",
      error: error.message,
    });
  }
});


// =====================================================
// GET TASKS BY PROJECT
// =====================================================
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get project tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch project tasks",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE TASK
// =====================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE TASK ID:", id);

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    console.log("TASK DELETED:", task._id);

    res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
});

export default router;