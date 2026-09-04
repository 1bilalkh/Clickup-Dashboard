import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Button,
  Divider,
  Avatar,
  LinearProgress,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  ArrowBack,
  Edit,
  CalendarMonth,
  Description,
  TaskAlt,
  Folder,
  AccessTime,
  Flag,
  CheckCircle,
  PendingActions,
  PlayCircle,
  Cancel,
  Person,
} from "@mui/icons-material";


const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  // ==========================================
  // FETCH PROJECT
  // ==========================================

  useEffect(() => {
    fetch(`${API_URL}/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Project not found");
        }

        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load project:", error);
        setLoading(false);
      });
  }, [projectId]);

  // ==========================================
  // FETCH PROJECT TASKS
  // ==========================================

  useEffect(() => {
    if (activeTab !== 1) {
      return;
    }

    setTasksLoading(true);

    fetch(`http://localhost:5000/api/tasks/project/${projectId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setTasksLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load tasks:", error);
        setTasksLoading(false);
      });
  }, [projectId, activeTab]);

  // ==========================================
  // LOADING
  // ==========================================

  const taskStats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status?.toLowerCase() === "completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status?.toLowerCase() === "in progress"
    ).length;

    const pending = tasks.filter(
      (task) => task.status?.toLowerCase() === "pending"
    ).length;

    const progress =
      total > 0 ? Math.round((completed / total) * 100) : 0;


    return {
      total,
      completed,
      inProgress,
      pending,
      progress,
    };
  }, [tasks]);












  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary">
            Loading project...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ==========================================
  // PROJECT NOT FOUND
  // ==========================================

  if (!project) {
    return (
      <Box sx={{ p: 4 }}>
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Folder
            sx={{
              fontSize: 60,
              color: "text.secondary",
              mb: 2,
            }}
          />

          <Typography variant="h5" fontWeight={700}>
            Project not found
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            The project you're looking for doesn't exist.
          </Typography>

          <Button
            startIcon={<ArrowBack />}
            sx={{ mt: 3 }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  // ==========================================
  // HELPERS
  // ==========================================

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";

      case "in progress":
        return "info";

      case "pending":
        return "warning";

      case "cancelled":
      case "canceled":
        return "error";

      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "error";

      case "medium":
        return "warning";

      case "low":
        return "success";

      default:
        return "default";
    }
  };

  const getTaskIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle fontSize="small" />;

      case "in progress":
        return <PlayCircle fontSize="small" />;

      case "pending":
        return <PendingActions fontSize="small" />;

      case "cancelled":
      case "canceled":
        return <Cancel fontSize="small" />;

      default:
        return <TaskAlt fontSize="small" />;
    }
  };

  // ==========================================
  // TASK STATISTICS
  // ==========================================



  // ==========================================
  // RETURN
  // ==========================================

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
          lg: 4,

        },
        maxWidth: '100%',
        backgroundColor: "#fff",
        mt: 2,
      }}
    >
      {/* ========================================
          TOP NAVIGATION
      ======================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Projects
        </Button>

        <Button
          variant="outlined"
          startIcon={<Edit />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Edit Project
        </Button>
      </Box>

      {/* ========================================
          PROJECT HERO
      ======================================== */}

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          mb: 3,
          p: {
            xs: 2.5,
            md: 4,
          },
        }}
      >
        {/* Decorative background */}

        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(25,118,210,.15), rgba(156,39,176,.08))",
            right: -80,
            top: -100,
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                fontSize: 26,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #1976d2, #7b1fa2)",
              }}
            >
              {project.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                fontWeight={600}
                sx={{
                  fontSize: {
                    xs: "1.7rem",
                    md: "1.5rem",
                  },
                }}
              >
                {project.name}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  maxWidth: 700,
                }}
              >
                {project.description ||
                  "No project description available."}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 2,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Chip
                  label={project.status || "Unknown"}
                  color={getStatusColor(project.status)}
                  icon={<CheckCircle />}
                  sx={{
                    fontWeight: 600, width: 150,
                    height: 36,
                  }}
                />

                <Chip
                  label={`${project.priority || "Normal"} Priority`}
                  color={getPriorityColor(project.priority)}
                  variant="outlined"
                  icon={<Flag />}
                  sx={{
                    fontWeight: 600, width: 150,
                    height: 36,
                  }}
                />
              </Stack>
            </Box>
          </Box>

          {/* Dates */}

          <Box
            sx={{
              minWidth: {
                xs: "100%",
                sm: 280,
              },
              p: 2,
              borderRadius: 3,
              backgroundColor: "action.hover",
            }}
          >
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <CalendarMonth color="primary" />

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Start Date
                  </Typography>

                  <Typography fontWeight={700}>
                    {formatDate(project.startDate)}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", gap: 1.5 }}>
                <AccessTime color="error" />

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Due Date
                  </Typography>

                  <Typography fontWeight={700}>
                    {formatDate(project.dueDate)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* ========================================
          TABS
      ======================================== */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          mb: 3,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 1,

            "& .MuiTab-root": {
              minHeight: 60,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            },

            "& .Mui-selected": {
              fontWeight: 700,
            },
          }}
        >
          <Tab
            icon={<Description />}
            iconPosition="start"
            label="Overview"
          />

          <Tab
            icon={<TaskAlt />}
            iconPosition="start"
            label={`Tasks ${tasks.length > 0 ? `(${tasks.length})` : ""
              }`}
          />

          <Tab
            icon={<CalendarMonth />}
            iconPosition="start"
            label="Calendar"
          />

          <Tab
            icon={<Folder />}
            iconPosition="start"
            label="Files"
          />
        </Tabs>
      </Paper>

      {/* ========================================
          OVERVIEW
      ======================================== */}

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* DESCRIPTION */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: "primary.main",
                  }}
                >
                  <Description />
                </Avatar>

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Project Overview
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Description and project details
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  lineHeight: 1.9,
                  color: "text.secondary",
                  fontSize: "1rem",
                }}
              >
                {project.description ||
                  "No description has been added to this project yet."}
              </Typography>
            </Paper>
          </Grid>

          {/* INFORMATION */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ mb: 2.5 }}
              >
                Project Information
              </Typography>

              <Stack spacing={2.5}>
                <InfoRow
                  icon={<CheckCircle color="success" />}
                  label="Status"
                  value={project.status || "Not set"}
                />

                <InfoRow
                  icon={<Flag color="warning" />}
                  label="Priority"
                  value={project.priority || "Not set"}
                />

                <InfoRow
                  icon={<CalendarMonth color="primary" />}
                  label="Start Date"
                  value={formatDate(project.startDate)}
                />

                <InfoRow
                  icon={<AccessTime color="error" />}
                  label="Due Date"
                  value={formatDate(project.dueDate)}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* PROGRESS */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Project Progress
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Based on completed project tasks
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  color="primary"
                >
                  {taskStats.progress}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={taskStats.progress}
                sx={{
                  height: 10,
                  borderRadius: 10,
                  mt: 2,
                }}
              />
            </Paper>
          </Grid>

          {/* STATISTICS */}

          <Grid size={{ xs: 12, md: 3 }}>
            <StatCard
              title="Total Tasks"
              value={taskStats.total}
              icon={<TaskAlt />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <StatCard
              title="Completed"
              value={taskStats.completed}
              icon={<CheckCircle />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <StatCard
              title="In Progress"
              value={taskStats.inProgress}
              icon={<PlayCircle />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <StatCard
              title="Pending"
              value={taskStats.pending}
              icon={<PendingActions />}
            />
          </Grid>
        </Grid>
      )}

      {/* ========================================
          TASKS
      ======================================== */}

      {activeTab === 1 && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Project Tasks
              </Typography>

              <Typography color="text.secondary">
                Manage and track all tasks for this project
              </Typography>
            </Box>

            <Chip
              label={`${tasks.length} Total`}
              color="primary"
              variant="outlined"
            />
          </Box>

          {tasksLoading ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <CircularProgress />

              <Typography
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Loading tasks...
              </Typography>
            </Paper>
          ) : tasks.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "action.hover",
                  color: "text.secondary",
                }}
              >
                <TaskAlt fontSize="large" />
              </Avatar>

              <Typography variant="h6" fontWeight={700}>
                No tasks yet
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                There are no tasks assigned to this project.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={2}>
              {tasks.map((task) => (
                <Grid item xs={12} md={6} lg={4} key={task._id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all .2s ease",

                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: 4,
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    {/* TASK HEADER */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.2,
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: "action.hover",
                            color: "primary.main",
                          }}
                        >
                          {getTaskIcon(task.status)}
                        </Avatar>

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{
                            wordBreak: "break-word",
                          }}
                        >
                          {task.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* DESCRIPTION */}

                    {task.description && (
                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 2,
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {task.description}
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* STATUS */}

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Chip
                        label={task.status || "Unknown"}
                        color={getStatusColor(task.status)}
                        size="small"
                        icon={getTaskIcon(task.status)}
                        sx={{ fontWeight: 600 }}
                      />

                      <Chip
                        label={task.priority || "Normal"}
                        color={getPriorityColor(task.priority)}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Stack>

                    {/* ASSIGNEE */}

                    {task.assignee && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Person
                          fontSize="small"
                          color="action"
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Assigned to{" "}
                          <strong>{task.assignee}</strong>
                        </Typography>
                      </Box>
                    )}

                    {/* DUE DATE */}

                    {task.dueDate && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1.5,
                        }}
                      >
                        <CalendarMonth
                          fontSize="small"
                          color="action"
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Due {formatDate(task.dueDate)}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* ========================================
          CALENDAR
      ======================================== */}

      {activeTab === 2 && (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            <CalendarMonth fontSize="large" />
          </Avatar>

          <Typography variant="h5" fontWeight={800}>
            Project Calendar
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Calendar integration will be added here.
          </Typography>
        </Paper>
      )}

      {/* ========================================
          FILES
      ======================================== */}

      {activeTab === 3 && (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            <Folder fontSize="large" />
          </Avatar>

          <Typography variant="h5" fontWeight={800}>
            Project Files
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Project files and documents will appear here.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

// ==========================================
// INFO ROW
// ==========================================

const InfoRow = ({ icon, label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>

        <Typography fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ mt: 0.5 }}
          >
            {value}
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 46,
            height: 46,
            bgcolor: "action.hover",
            color: "primary.main",
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </Paper>
  );
};

export default ProjectDetails;