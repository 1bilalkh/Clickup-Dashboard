import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { useClerk } from "@clerk/react";

import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TaskIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useQuery, useQueryClient  } from "@tanstack/react-query";
import axios from "axios";

function Sidebar({ closeSidebar }) {
  const theme = useTheme();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [openId, setOpenId] = useState(null);

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "Todo",
    priority: "Medium",
    startDate: "",
    dueDate: "",
    tag: "",
    project: "",
  });

  const handleProjectChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleOpenProjectModal = (event) => {
    event.stopPropagation();

    setProjectForm({
      name: "",
      description: "",
    });

    setOpenProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };
  const handleCreateProject = async () => {
  if (!projectForm.name.trim()) {
    alert("Please enter a project name");
    return;
  }

  try {
    setIsSubmitting(true);

    const response = await axios.post(
      `${API_URL}/api/projects`,
      projectForm
    );

    console.log("Project created:", response.data);

    // Refresh projects in Sidebar
    await queryClient.invalidateQueries({
      queryKey: ["projects"],
    });

    setProjectForm({
      name: "",
      description: "",
    });

    setOpenProjectModal(false);

    alert("Project created successfully");
  } catch (error) {
    console.error("Create project error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to create project"
    );
  } finally {
    setIsSubmitting(false);
  }
};







  const { signOut } = useClerk();
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/projects`);
      return response.data;
    },
  });


  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  //   const handleProjectChange = (event) => {
  //   const { name, value } = event.target;

  //   setProjectForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };





  const handleTaskChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenTaskModal = (event) => {
    event.stopPropagation();

    setTaskForm({
      title: "",
      description: "",
      assignee: "",
      status: "Todo",
      priority: "Medium",
      startDate: "",
      dueDate: "",
      tag: "",
      project: "",
    });

    setOpenTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
  };



  const handleCreateTask = async () => {
    if (!taskForm.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    if (!taskForm.project) {
      alert("Please select a project");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${API_URL}/api/tasks`,
        taskForm
      );

      console.log("Task created:", response.data);

      alert("Task created successfully");

      setOpenTaskModal(false);

      setTaskForm({
        title: "",
        description: "",
        assignee: "",
        status: "Todo",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        tag: "",
        project: "",
      });
    } catch (error) {
      console.error("Create task error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create task"
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  const menuItems = [
    {
      id: 1,
      text: "Dashboard",
      icon: <DashboardCustomizeOutlinedIcon />,
      path: "/",
    },
    {
      id: 2,
      text: "Tasks",
      icon: <TaskIcon />,
      children: [
        {
          id: 12,
          text: "Our Task",
          path: "/tasks",
        },

      ],
      path: "/task",
    },
    {
      id: 3,
      text: "Calendar",
      icon: <CalendarMonthOutlinedIcon />,
      path: "/calendar",
    },
    {
      id: 4,
      text: "Projects",
      icon: <FolderOpenOutlinedIcon />,
      children: projects.map((project) => ({
        id: project._id,
        text: project.name,
        path: `/projects/${project._id}`,
      })),
      path: "/projects",
    },
  ];

  const menuItemsCenter = [
    { id: 5, text: "AI", icon: <AttractionsOutlinedIcon />, path: "/ai" },
    {
      id: 6,
      text: "Teams",
      icon: <PeopleOutlineOutlinedIcon />,
      path: "/teams",
    },
    // {
    //   id: 7,
    //   text: "Forms",
    //   icon: <IntegrationInstructionsOutlinedIcon />,
    //   path: "/forms",
    // },
    {
      id: 8,
      text: "Invoice",
      icon: <DescriptionOutlinedIcon />,
      path: "/invoice",
    },
    {
      id: 9,
      text: "Price",
      icon: <AttachMoneyIcon />,
      path: "/Price",
    },
  ];

  const bottomItems = [
    {
      id: 10,
      text: "Settings",
      icon: <SettingsOutlinedIcon />,
      path: "/Settings",
    },
    // {
    //   id: 11,
    //   text: "Logout",
    //   icon: <LogoutIcon />,
    //   action: () => signOut({ redirectUrl: "/signin" })
    // },
  ];

  // Function to handle link clicks
  const handleLinkClick = () => {
    if (closeSidebar) closeSidebar(); // Close sidebar only on link click
  };
  const sidebarWidth = 250;


  return (
    <>
      <Box
        sx={{
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(to right, rgb(255, 255, 255), rgb(224, 247, 255))"
              : "linear-gradient(to right, rgb(18, 18, 18), rgb(20, 45, 55))",
          width: sidebarWidth,
          display: "flex",
          position: {
            xs: "fixed",
            md: "fixed",
          },
          left: {
            xs: closeSidebar ? 0 : "-260px",
            md: 0,
          },
          transition: "0.3s",
          zIndex: 1200,
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          color: "text.primary",
          top: 0,
          overflowY: "auto",
          height: {
            xs: "calc(100vh - 0px)",
            sm: "calc(100vh - 0px)",
            md: "calc(100vh - 104px)",
          },
          mt: {
            xs: 0,
            sm: 0,
            md: "110px",
            lg: "110px",
          },
          ml: {
            xs: 0,
            sm: 0,
            md: "20px",
            lg: "20px",
          },
          mb: {
            xs: 0,
            sm: 0,
            md: "20px",
            lg: "20px",
          },
          pt: {
            xs: 0,
            sm: 0,
            md: "2px",
            lg: "2px",
          },
          borderRadius: {
            xs: "0px",
            sm: "0px",
            md: "20px",
            lg: "20px",
          },
        }}
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside sidebar
      >
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "6px",
            },
            "*::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "*::-webkit-scrollbar-thumb": {
              background: "linear-gradient(to right, #6d8cc2, #778fb8);",
              borderRadius: "30px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#888",
            },
          }}
        />
        {/* TOP MENU */}
        <List>
          {menuItems.map((item) => (
            <Box key={item.id}>
              <ListItemButton
                component={item.children ? "div" : Link}
                to={item.children ? undefined : item.path}
                onClick={() =>
                  item.children ? handleToggle(item.id) : handleLinkClick()
                }
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  my: 0.2,
                  p: 0.5,
                  pl: 2,
                  borderRadius: "30px",

                  "&.Mui-selected": {
                    bgcolor: "action.selected",

                    "& .MuiListItemIcon-root": {
                      color: "#6c5cf5",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {item.text}
                    </Typography>
                  }
                />

                {/* Add button only for Projects */}

                {item.text === "Projects" && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProjectModal(e);
                    }}
                    sx={{
                      mr: 0.5,
                      backgroundColor: "#6c5cf5",
                      color: "#fff",
                      width: "20px",
                      height: "20px",
                      "&:hover": {
                        backgroundColor: "#5a4bcf",
                      },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>

                )}

                {item.children &&
                  (openId === item.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItemButton>

              {/* Dropdown Section */}
              {item.children && (
                <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.id}
                        component={Link}
                        to={child.path}
                        onClick={handleLinkClick}
                        selected={location.pathname === child.path}
                        sx={{
                          pl: 6,
                          mx: 1,
                          borderRadius: "30px",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              {child.text}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        <Divider sx={{ pt: "10px", mb: "10px", display: "block" }} />

        <List>
          {menuItemsCenter.map((item) => (
            <ListItemButton
              key={item.id}
              component={Link}
              to={item.path}
              onClick={handleLinkClick} // <-- close on link click
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                my: 0.2,
                p: 0.5,
                pl: 2,
                borderRadius: "30px",

                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  "& .MuiListItemIcon-root": {
                    color: "#6c5cf5",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{ p: 0 }}
                primary={<Typography variant="body2">{item.text}</Typography>}
              />
            </ListItemButton>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            width: "70%",
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '26px',
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(to right, #ccd9ef, #c8d4e9);",
            color: "#000",
            py: 5,
            borderRadius: '5px'
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Points Earned
          </Typography>
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ display: "flex", alignItems: "center", color: "#000", }}
          >
            2,450
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        {/* BOTTOM MENU */}
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {/* Settings */}
          {bottomItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleLinkClick}
              sx={{
                justifyContent: "flex-start",
                display: "flex",
                marginBottom: "8px",
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>

              <ListItemText
                primary={<Typography variant="body2">{item.text}</Typography>}
              />
            </ListItemButton>
          ))}

          {/* Sign Out */}
          <ListItemButton
            onClick={() => {
              handleLinkClick();
              signOut({ redirectUrl: "/signin" });
            }}
            sx={{
              justifyContent: "flex-start",
              display: "flex",
              marginBottom: "8px",
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText
              primary={<Typography variant="body2">Sign Out</Typography>}
            />
          </ListItemButton>
        </List>
      </Box>

      <Dialog
        open={openProjectModal}
        onClose={handleCloseProjectModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            px: 3,
            pt: 3,
            pb: 1,
            fontWeight: 700,
            fontSize: "1.3rem",
          }}
        >
          Create New Project

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Create a project to organize your tasks and work.
          </Typography>
        </DialogTitle>

        {/* Form */}
        <DialogContent sx={{ px: 3, py: 2 }}>

          {/* Project Name */}
          <TextField
            fullWidth
            label="Project Name"
            name="name"
            value={projectForm.name}
            onChange={handleProjectChange}
            placeholder="e.g. Website Redesign"
            required
            margin="normal"
            autoFocus
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={projectForm.description}
            onChange={handleProjectChange}
            placeholder="Describe what this project is about..."
            margin="normal"
            multiline
            rows={4}
          />

          {/* Status & Priority */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              select
              fullWidth
              label="Status"
              defaultValue="Planning"
            >
              <MenuItem value="Planning">Planning</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Priority"
              defaultValue="Medium"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
          </Box>

          {/* Dates */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

        </DialogContent>

        {/* Footer */}
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseProjectModal}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateProject}
            disabled={isSubmitting}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              fontWeight: 600,
            }}
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default Sidebar;
