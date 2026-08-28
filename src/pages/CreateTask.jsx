import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
  Stack,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

function CreateTask() {
  const navigate = useNavigate();

  // -----------------------------
  // Task form state
  // -----------------------------
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "Todo",
    priority: "Medium",
    project: "",
    startDate: "",
    dueDate: "",
    tag: "",
  });

  // -----------------------------
  // Users state
  // -----------------------------
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // -----------------------------
  // Loading state
  // -----------------------------
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Success / Error messages
  // -----------------------------
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // -----------------------------
  // Fetch users
  // -----------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        console.log("Users loaded:", data);

        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load users:", error);

        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Create task
  // -----------------------------
  const handleCreateTask = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!task.title.trim()) {
      setError(true);
      setMessage("Task name is required.");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(task),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create task"
        );
      }

      console.log("Task created successfully:", data);

      setError(false);
      setMessage("Task created successfully!");

      // Go back to Tasks page after successful creation
      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    } catch (error) {
      console.error("Create task error:", error);

      setError(true);
      setMessage(
        error.message || "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7f8fa",
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* -------------------------------- */}
        {/* Back Button */}
        {/* -------------------------------- */}

        <Box sx={{ mb: 1 }}>
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate("/tasks")}
            sx={{
              textTransform: "none",
              color: "#6b7280",
              fontWeight: 500,
              px: 0,

              "&:hover": {
                backgroundColor: "transparent",
                color: "#111827",
              },
            }}
          >
            Back to Tasks
          </Button>
        </Box>

        {/* -------------------------------- */}
        {/* Main Card */}
        {/* -------------------------------- */}

        <Paper
          component="form"
          onSubmit={handleCreateTask}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "1100px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            boxShadow:
              "0 4px 20px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
          }}
        >
          {/* -------------------------------- */}
          {/* Task Information */}
          {/* -------------------------------- */}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#111827",
                mb: 0.5,
              }}
            >
              Task Information
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                mb: 3,
              }}
            >
              Add the basic information for your task.
            </Typography>

            <Stack spacing={2.5}>
              {/* -------------------------------- */}
              {/* Task Name */}
              {/* -------------------------------- */}

              <TextField
                fullWidth
                required
                label="Task name"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task name"
              />

              {/* -------------------------------- */}
              {/* Description */}
              {/* -------------------------------- */}

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Description"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Describe this task..."
              />

              {/* -------------------------------- */}
              {/* Assignee / Status / Priority */}
              {/* -------------------------------- */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {/* Assignee */}

                <TextField
                  select
                  fullWidth
                  label="Assignee"
                  name="assignee"
                  value={task.assignee}
                  onChange={handleChange}
                  disabled={usersLoading}
                >
                  <MenuItem value="">
                    Unassigned
                  </MenuItem>

                  {users.map((user) => {
                    const userName =
                      user.name ||
                      `${user.firstName || ""} ${
                        user.lastName || ""
                      }`.trim() ||
                      user.email ||
                      "Unnamed User";

                    const userValue =
                      user.email ||
                      user.clerkId ||
                      user._id;

                    return (
                      <MenuItem
                        key={user._id || user.clerkId || user.email}
                        value={userValue}
                      >
                        {userName}
                      </MenuItem>
                    );
                  })}
                </TextField>

                {/* Status */}

                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Todo">
                    Todo
                  </MenuItem>

                  <MenuItem value="In Progress">
                    In Progress
                  </MenuItem>

                  <MenuItem value="Review">
                    Review
                  </MenuItem>

                  <MenuItem value="Completed">
                    Completed
                  </MenuItem>
                </TextField>

                {/* Priority */}

                <TextField
                  select
                  fullWidth
                  label="Priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="Low">
                    Low
                  </MenuItem>

                  <MenuItem value="Medium">
                    Medium
                  </MenuItem>

                  <MenuItem value="High">
                    High
                  </MenuItem>

                  <MenuItem value="Urgent">
                    Urgent
                  </MenuItem>
                </TextField>
              </Box>

              {/* -------------------------------- */}
              {/* Dates / Project */}
              {/* -------------------------------- */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {/* Start Date */}

                <TextField
                  fullWidth
                  type="date"
                  label="Start date"
                  name="startDate"
                  value={task.startDate}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

                {/* Due Date */}

                <TextField
                  fullWidth
                  type="date"
                  label="Due date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

                {/* Project */}

                <TextField
                  select
                  fullWidth
                  label="Project"
                  name="project"
                  value={task.project}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    Select project
                  </MenuItem>

                  <MenuItem value="Website">
                    Website
                  </MenuItem>

                  <MenuItem value="Dashboard">
                    Dashboard
                  </MenuItem>

                  <MenuItem value="Mobile App">
                    Mobile App
                  </MenuItem>
                </TextField>
              </Box>

              {/* -------------------------------- */}
              {/* Tag */}
              {/* -------------------------------- */}

              <TextField
                fullWidth
                label="Tag"
                name="tag"
                value={task.tag}
                onChange={handleChange}
                placeholder="e.g. frontend"
              />

              {/* Tag Preview */}

              {task.tag && (
                <Box>
                  <Chip
                    label={task.tag}
                    onDelete={() =>
                      setTask((prev) => ({
                        ...prev,
                        tag: "",
                      }))
                    }
                  />
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* -------------------------------- */}
          {/* Footer */}
          {/* -------------------------------- */}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },

              display: "flex",
              justifyContent: "flex-end",

              gap: 1.5,

              backgroundColor: "#fafafa",

              flexWrap: "wrap",
            }}
          >
            {/* Cancel */}

            <Button
              variant="outlined"
              onClick={() => navigate("/tasks")}
              disabled={loading}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
              }}
            >
              Cancel
            </Button>

            {/* Create */}

            <Button
              type="submit"
              variant="contained"
              startIcon={<AddTaskOutlinedIcon />}
              disabled={loading}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                fontWeight: 600,
              }}
            >
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* -------------------------------- */}
      {/* Snackbar */}
      {/* -------------------------------- */}

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setMessage("")}
          severity={error ? "error" : "success"}
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateTask;