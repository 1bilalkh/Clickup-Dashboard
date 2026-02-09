import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TasksContent() {
const [tasks, setTasks] = useState([
    { id: 1, title: "Design Dashboard UI", status: "todo" },
    { id: 2, title: "Fix API Bugs", status: "inprogress" },
    { id: 3, title: "Deploy App", status: "done" },
    { id: 4, title: "Create Login Page", status: "todo" },
  ]);

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const renderColumn = (title, status) => (
    <Box
      sx={{
        width: "100%",
        minHeight: "400px",
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Card key={task.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>{task.title}</Typography>

              <Box mt={1} display="flex" gap={1}>
                {status !== "todo" && (
                  <Button
                    size="small"
                    startIcon={<AssignmentIcon sx={{ color: "black" }} />}
                    onClick={() => moveTask(task.id, "todo")}
                  >
                    To Do
                  </Button>
                )}
                {status !== "inprogress" && (
                  <Button
                    size="small"
                    startIcon={<LoopIcon sx={{ color: "black" }} />}
                    onClick={() => moveTask(task.id, "inprogress")}
                  >
                    In Progress
                  </Button>
                )}
                {status !== "done" && (
                  <Button
                    size="small"
                    startIcon={<CheckCircleIcon sx={{ color: "black" }} />}
                    onClick={() => moveTask(task.id, "done")}
                  >
                    Done
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Task Board
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {renderColumn("To Do", "todo")}
        {renderColumn("In Progress", "inprogress")}
        {renderColumn("Done", "done")}
      </Box>
    </Box>
  );
}

export default TasksContent;
