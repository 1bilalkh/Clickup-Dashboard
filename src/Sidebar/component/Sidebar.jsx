import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TaskIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";


function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const menuItems = [
    {id: 1, text: <Typography variant="body2">Dashboard</Typography>, icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
    {id: 2, text: <Typography variant="body2">Tasks</Typography>, icon: <TaskIcon />, path: "/tasks" },
    {id: 3, text: <Typography variant="body2">Calendar</Typography>, icon: <CalendarMonthOutlinedIcon />, path: "/calendar" },
    {id: 4, text: <Typography variant="body2">Projects</Typography>, icon: <FolderOpenOutlinedIcon />, path: "/projects" },
    {id: 5, text: <Typography variant="body2">Inbox</Typography>, icon: <MailOutlinedIcon />, path: "/projects" },
    {id: 6, text: <Typography variant="body2">AI</Typography>, icon: <AttractionsOutlinedIcon />, path: "/projects" },
    {id: 7, text: <Typography variant="body2">Teams</Typography>, icon: <PeopleOutlineOutlinedIcon />, path: "/projects" },
    {id: 8, text: <Typography variant="body2">Forms</Typography>, icon: <IntegrationInstructionsOutlinedIcon />, path: "/projects" },
  ];

  const bottomItems = [
      { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
      { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  return (
    <Box
      sx={{
        width: 200,
        bgcolor: "#fdfdfd",
        height: "100vh",
        borderRight: "1px solid #e0e0e0"
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.id}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            component={Link}   // Make it a Link
            to={item.path}      // Link target
            sx={{
              margin: "2px 12px",
              borderBottom: "1px solid #ddd",
              p: "2px 6px", 
              borderRadius: "0px",
              "&.Mui-selected": {
                bgcolor: "#e0e0e0",
                color: "#000000",
                "& .MuiListItemIcon-root": {
                  color: "#000000",
                },
              },
              "&:hover": {
                bgcolor: "#eaeaea",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontSize: "0.875rem" }}
            />
          </ListItemButton>
        ))}
      </List>
          <Divider sx={{mt: 5}} />
          <List
        sx={{
          display: "flex",
          position: "fixed", bottom: 0, left: 0
        }}
      >
        {bottomItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            
            sx={{
              width: "100%",
              display: "flex",
              padding: "0px 3px",
              color: "#000000",
              fontSize: "10px",
              flexDirection: "row",
              "&.Mui-selected": {
                bgcolor: "#e0e0e0",
                color: "#000000",
                "& .MuiListItemIcon-root": {
                  color: "#000000",
                },
              },
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "inherit", fontSize: "10px"}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{fontSize: "10px" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
