import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Pagination,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const API_URL = "http://localhost:5000";

const TASKS_PER_PAGE = 4;

const Task = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(1);

  // =====================================================
  // FETCH TASKS
  // =====================================================

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch tasks error:", error);

      setError(
        error.message || "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // LOAD TASKS
  // =====================================================

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // =====================================================
  // FILTER TASKS
  // =====================================================

  const filteredTasks = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !searchValue ||
        task.title?.toLowerCase().includes(searchValue) ||
        task.description?.toLowerCase().includes(searchValue) ||
        task.assignee?.toLowerCase().includes(searchValue) ||
        task.project?.toLowerCase().includes(searchValue) ||
        task.tag?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredTasks.length / TASKS_PER_PAGE
  );

  const startIndex =
    (page - 1) * TASKS_PER_PAGE;

  const endIndex = Math.min(
    startIndex + TASKS_PER_PAGE,
    filteredTasks.length
  );

  const paginatedTasks = useMemo(() => {
    return filteredTasks.slice(
      startIndex,
      endIndex
    );
  }, [
    filteredTasks,
    startIndex,
    endIndex,
  ]);

  // =====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =====================================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    statusFilter,
    priorityFilter,
  ]);

  // =====================================================
  // KEEP PAGE VALID
  // =====================================================

  useEffect(() => {
    if (totalPages === 0) {
      setPage(1);
      return;
    }

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(taskId);
      setError("");

      const response = await fetch(
        `${API_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete task"
        );
      }

      // Remove task from UI immediately
      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== taskId
        )
      );
    } catch (error) {
      console.error(
        "Delete task error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete task."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // EDIT TASK
  // =====================================================

  const handleEdit = (task) => {
    console.log("Edit task:", task);

    alert(`Edit task: ${task.title}`);
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "info";

      case "Review":
        return "warning";

      case "Completed":
        return "success";

      case "Todo":
      default:
        return "default";
    }
  };

  // =====================================================
  // PRIORITY COLOR
  // =====================================================

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "success";

      case "Medium":
        return "info";

      case "High":
        return "warning";

      case "Urgent":
        return "error";

      default:
        return "default";
    }
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
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
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#111827",
              mb: 0.5,
            }}
          >
            Tasks
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
            }}
          >
            Manage and track all your tasks
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/CreateTask")
          }
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          Create Task
        </Button>
      </Box>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {/* =================================================
          FILTERS
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          p: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "2fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {/* SEARCH */}

          <TextField
            fullWidth
            size="small"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{
                    color: "#9ca3af",
                    mr: 1,
                  }}
                />
              ),
            }}
          />

          {/* STATUS */}

          <TextField
            select
            size="small"
            label="Status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <MenuItem value="All">
              All Status
            </MenuItem>

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

          {/* PRIORITY */}

          <TextField
            select
            size="small"
            label="Priority"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target.value
              )
            }
          >
            <MenuItem value="All">
              All Priority
            </MenuItem>

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
      </Paper>

      {/* =================================================
          TASK TABLE
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "grid",
            },
            gridTemplateColumns:
              "2fr 1.2fr 1fr 1fr 1fr 90px",
            gap: 2,
            px: 3,
            py: 2,
            backgroundColor: "#f9fafb",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
          >
            TASK
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            ASSIGNEE
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            STATUS
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            PRIORITY
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            DUE DATE
          </Typography>

          <Typography
            variant="caption"
            fontWeight={700}
          >
            ACTION
          </Typography>
        </Box>

        <Divider />

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <Box
            sx={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : filteredTasks.length === 0 ? (
          /* =================================================
             EMPTY
          ================================================= */

          <Box
            sx={{
              minHeight: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              No tasks found
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                mb: 2,
                textAlign: "center",
              }}
            >
              {search ||
              statusFilter !== "All" ||
              priorityFilter !== "All"
                ? "Try changing your search or filters."
                : "Create your first task to get started."}
            </Typography>

            {!search &&
              statusFilter === "All" &&
              priorityFilter === "All" && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    navigate("/CreateTask")
                  }
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Create Task
                </Button>
              )}
          </Box>
        ) : (
          /* =================================================
             TASK ROWS
          ================================================= */

          paginatedTasks.map((task) => (
            <Box
              key={task._id}
              sx={{
                display: {
                  xs: "block",
                  md: "grid",
                },
                gridTemplateColumns:
                  "2fr 1.2fr 1fr 1fr 1fr 90px",
                gap: 2,
                px: 3,
                py: 2.5,
                borderBottom:
                  "1px solid #f0f0f0",

                "&:last-child": {
                  borderBottom: "none",
                },

                "&:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
            >
              {/* TASK */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 0.5,
                  }}
                >
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient:
                      "vertical",
                    overflow: "hidden",
                  }}
                >
                  {task.description ||
                    "No description"}
                </Typography>

                {task.tag && (
                  <Chip
                    label={task.tag}
                    size="small"
                    sx={{
                      mt: 1,
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>

              {/* ASSIGNEE */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: {
                    xs: 2,
                    md: 0,
                  },
                }}
              >
                <Typography
                  variant="body2"
                >
                  {task.assignee ||
                    "Unassigned"}
                </Typography>
              </Box>

              {/* STATUS */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: {
                    xs: 1,
                    md: 0,
                  },
                }}
              >
                <Chip
                  label={task.status}
                  color={getStatusColor(
                    task.status
                  )}
                  size="small"
                  sx={{
                    borderRadius: 1,
                  }}
                />
              </Box>

              {/* PRIORITY */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: {
                    xs: 1,
                    md: 0,
                  },
                }}
              >
                <Chip
                  label={task.priority}
                  color={getPriorityColor(
                    task.priority
                  )}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                  }}
                />
              </Box>

              {/* DUE DATE */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: {
                    xs: 1,
                    md: 0,
                  },
                }}
              >
                <Typography
                  variant="body2"
                >
                  {formatDate(
                    task.dueDate
                  )}
                </Typography>
              </Box>

              {/* ACTIONS */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: {
                    xs: 1,
                    md: 0,
                  },
                }}
              >
                {/* EDIT */}

                <IconButton
                  size="small"
                  onClick={() =>
                    handleEdit(task)
                  }
                  title="Edit task"
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>

                {/* DELETE */}

                <IconButton
                  size="small"
                  color="error"
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                  disabled={
                    deletingId ===
                    task._id
                  }
                  title="Delete task"
                >
                  {deletingId ===
                  task._id ? (
                    <CircularProgress
                      size={18}
                    />
                  ) : (
                    <DeleteOutlineIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </Paper>

      {/* =================================================
          PAGINATION + RESULT COUNT
      ================================================= */}

      {!loading &&
        filteredTasks.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                totalPages > 1
                  ? "space-between"
                  : "flex-start",

              gap: 2,
              mt: 3,
              pb: 2,

              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {/* RESULT COUNT */}

            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                whiteSpace: "nowrap",
              }}
            >
              Showing{" "}
              {startIndex + 1}–
              {endIndex} of{" "}
              {filteredTasks.length}{" "}
              tasks
            </Typography>

            {/* PAGINATION */}

            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(
                  event,
                  value
                ) => {
                  setPage(value);
                }}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            )}
          </Box>
        )}
    </Box>
  );
};

export default Task;