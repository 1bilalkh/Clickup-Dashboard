import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const API_URL = "http://localhost:5000";

// =====================================================
// FETCH TASKS
// =====================================================

const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// =====================================================
// STATUS COLOR
// =====================================================

const getStatusColor = (status, theme) => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "complete":
    case "done":
      return "#2e7d32";

    case "in progress":
    case "in-progress":
    case "progress":
      return "#1976d2";

    case "pending":
    case "todo":
    case "to do":
      return "#ed6c02";

    case "cancelled":
    case "canceled":
      return "#9e9e9e";

    default:
      return theme.palette.primary.main;
  }
};

// =====================================================
// CALENDAR PAGE
// =====================================================

function CalendarPage() {
  const theme = useTheme();

  const [selectedTask, setSelectedTask] =
    useState(null);

  // ===================================================
  // GET TASKS
  // ===================================================

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    refetchInterval: 30000,
  });

  // ===================================================
  // CONVERT TASKS → FULLCALENDAR EVENTS
  // ===================================================

  const events = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          task.startDate ||
          task.dueDate
      )
      .map((task) => {
        const color = getStatusColor(
          task.status,
          theme
        );

        return {
          id: task._id,

          title:
            task.title ||
            "Untitled Task",

          start:
            task.startDate ||
            task.dueDate,

          end:
            task.dueDate ||
            undefined,

          allDay: true,

          backgroundColor: color,

          borderColor: color,

          textColor: "#ffffff",

          extendedProps: {
            task,
          },
        };
      });
  }, [tasks, theme]);

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 3,
        }}
      >
        Loading calendar...
      </Box>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 3,
          color: "error.main",
        }}
      >
        Failed to load tasks.
      </Box>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =================================================
          CALENDAR
      ================================================= */}

      <Box
        className="owncalender"
        sx={{
          width: "100%",

          // =============================================
          // FULLCALENDAR
          // =============================================

          "& .fc": {
            fontFamily:
              theme.typography.fontFamily,

            color:
              theme.palette.text.primary,
          },

          // =============================================
          // TOOLBAR
          // =============================================

          "& .fc-toolbar": {
            flexWrap: "wrap",
            gap: 1,
          },

          "& .fc-toolbar-title": {
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
            },

            fontWeight: 600,

            color:
              theme.palette.text.primary,
          },

          // =============================================
          // BUTTONS
          // =============================================

          "& .fc-button": {
            backgroundColor:
              theme.palette.background.paper,

            border: `1px solid ${theme.palette.divider}`,

            color:
              theme.palette.text.primary,

            boxShadow: "none",

            textTransform: "capitalize",

            borderRadius: "6px",

            "&:hover": {
              backgroundColor:
                theme.palette.action.hover,

              borderColor:
                theme.palette.divider,
            },

            "&:focus": {
              boxShadow: "none",
            },
          },

          // =============================================
          // ACTIVE BUTTON
          // =============================================

          "& .fc-button-primary:not(:disabled).fc-button-active":
            {
              backgroundColor:
                theme.palette.primary.main,

              borderColor:
                theme.palette.primary.main,

              color: "#ffffff",
            },

          // =============================================
          // CALENDAR GRID
          // =============================================

          "& .fc-scrollgrid": {
            borderColor:
              theme.palette.divider,

            borderRadius: "10px",

            overflow: "hidden",
          },

          "& td": {
            borderColor:
              theme.palette.divider,
          },

          "& th": {
            borderColor:
              theme.palette.divider,
          },

          // =============================================
          // DAY HEADER
          // =============================================

          "& .fc-col-header-cell": {
            backgroundColor:
              theme.palette.background.paper,

            padding: "10px 0",
          },

          "& .fc-col-header-cell-cushion": {
            color:
              theme.palette.text.secondary,

            textDecoration: "none",

            fontWeight: 600,

            fontSize: "12px",
          },

          // =============================================
          // DAY NUMBER
          // =============================================

          "& .fc-daygrid-day-number": {
            color:
              theme.palette.text.primary,

            textDecoration: "none",

            padding: "8px",

            fontSize: "13px",
          },

          // =============================================
          // TODAY
          // =============================================

          "& .fc-day-today": {
            backgroundColor:
              `${theme.palette.primary.main}10 !important`,
          },

          // =============================================
          // CALENDAR EVENTS
          // =============================================

          "& .fc-event": {
            borderRadius: "6px",

            border: "none",

            padding: "3px 6px",

            cursor: "pointer",

            fontSize: "12px",

            fontWeight: 500,

            transition:
              "opacity 0.15s ease, transform 0.15s ease",

            "&:hover": {
              opacity: 0.9,

              transform:
                "translateY(-1px)",
            },
          },

          "& .fc-event-title": {
            whiteSpace: "nowrap",

            overflow: "hidden",

            textOverflow: "ellipsis",
          },

          // =============================================
          // OTHER MONTH DAYS
          // =============================================

          "& .fc-day-other": {
            backgroundColor:
              `${theme.palette.action.hover}20`,
          },

          // =============================================
          // MORE EVENTS
          // =============================================

          "& .fc-more-link": {
            color:
              theme.palette.primary.main,

            fontWeight: 600,

            textDecoration: "none",
          },

          // =============================================
          // WEEK / DAY VIEW
          // =============================================

          "& .fc-timegrid-slot-label": {
            color:
              theme.palette.text.secondary,
          },

          "& .fc-timegrid-axis-cushion": {
            color:
              theme.palette.text.secondary,
          },
        }}
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
          ]}

          // ===========================================
          // DEFAULT VIEW
          // ===========================================

          initialView="dayGridMonth"

          height="auto"

          // ===========================================
          // HEADER
          // ===========================================

          headerToolbar={{
            left:
              "prev,next today",

            center:
              "title",

            right:
              "dayGridMonth,timeGridWeek,timeGridDay",
          }}

          // ===========================================
          // REAL TASK DATA
          // ===========================================

          events={events}

          // ===========================================
          // MAX EVENTS PER DAY
          // ===========================================

          dayMaxEvents={3}

          // ===========================================
          // CLICK EVENT
          // ===========================================

          eventClick={(info) => {
            const task =
              info.event.extendedProps.task;

            setSelectedTask(task);

            console.log(
              "Selected task:",
              task
            );
          }}

          // ===========================================
          // DATE CLICK
          // ===========================================

          dateClick={(info) => {
            console.log(
              "Selected date:",
              info.dateStr
            );
          }}
        />
      </Box>

      {/* =================================================
          SELECTED TASK DETAILS
      ================================================= */}

      {selectedTask && (
        <Box
          sx={{
            mt: 2,

            p: 2.5,

            borderRadius: "12px",

            border: `1px solid ${theme.palette.divider}`,

            backgroundColor:
              theme.palette.background.paper,
          }}
        >
          {/* =============================================
              HEADER
          ============================================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "flex-start",

              gap: 2,
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: "17px",

                  fontWeight: 600,

                  color:
                    theme.palette.text.primary,
                }}
              >
                {selectedTask.title ||
                  "Untitled Task"}
              </Box>

              {selectedTask.status && (
                <Box
                  sx={{
                    display:
                      "inline-block",

                    mt: 1,

                    px: 1.2,

                    py: 0.4,

                    borderRadius: "20px",

                    fontSize: "12px",

                    fontWeight: 600,

                    color: "#ffffff",

                    backgroundColor:
                      getStatusColor(
                        selectedTask.status,
                        theme
                      ),
                  }}
                >
                  {selectedTask.status}
                </Box>
              )}
            </Box>

            {/* CLOSE */}

            <Box
              component="button"
              onClick={() =>
                setSelectedTask(null)
              }
              sx={{
                border: "none",

                background:
                  "transparent",

                color:
                  theme.palette.text.secondary,

                cursor: "pointer",

                fontSize: "13px",

                "&:hover": {
                  color:
                    theme.palette.text.primary,
                },
              }}
            >
              Close
            </Box>
          </Box>

          {/* =============================================
              DESCRIPTION
          ============================================= */}

          {selectedTask.description && (
            <Box
              sx={{
                mt: 2,

                color:
                  theme.palette.text.secondary,

                fontSize: "14px",

                lineHeight: 1.6,
              }}
            >
              {selectedTask.description}
            </Box>
          )}

          {/* =============================================
              DATES
          ============================================= */}

          <Box
            sx={{
              display: "flex",

              gap: 3,

              flexWrap: "wrap",

              mt: 2,

              fontSize: "13px",
            }}
          >
            {selectedTask.startDate && (
              <Box>
                <Box
                  sx={{
                    color:
                      theme.palette.text.secondary,
                  }}
                >
                  Start Date
                </Box>

                <Box
                  sx={{
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  {new Date(
                    selectedTask.startDate
                  ).toLocaleDateString()}
                </Box>
              </Box>
            )}

            {selectedTask.dueDate && (
              <Box>
                <Box
                  sx={{
                    color:
                      theme.palette.text.secondary,
                  }}
                >
                  Due Date
                </Box>

                <Box
                  sx={{
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  {new Date(
                    selectedTask.dueDate
                  ).toLocaleDateString()}
                </Box>
              </Box>
            )}

            {selectedTask.priority && (
              <Box>
                <Box
                  sx={{
                    color:
                      theme.palette.text.secondary,
                  }}
                >
                  Priority
                </Box>

                <Box
                  sx={{
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  {selectedTask.priority}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CalendarPage;