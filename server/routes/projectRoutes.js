import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});

// GET SINGLE PROJECT
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
});

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      priority,
      startDate,
      dueDate,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name,
      description,
      status,
      priority,
      startDate,
      dueDate,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
});

// UPDATE PROJECT
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
});

export default router;