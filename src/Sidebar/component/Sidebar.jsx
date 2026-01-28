import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TaskIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar({ closeSidebar }) {
  const location = useLocation();

  const menuItems = [
    { id: 1, text: "Dashboard", icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
    { id: 2, text: "Tasks", icon: <TaskIcon />, path: "/tasks" },
    { id: 3, text: "Calendar", icon: <CalendarMonthOutlinedIcon />, path: "/calendar" },
    { id: 4, text: "Projects", icon: <FolderOpenOutlinedIcon />, path: "/projects" },
  ];

  const menuItemsCenter = [
    { id: 5, text: "Inbox", icon: <MailOutlinedIcon />, path: "/inbox" },
    { id: 6, text: "AI", icon: <AttractionsOutlinedIcon />, path: "/ai" },
    { id: 7, text: "Teams", icon: <PeopleOutlineOutlinedIcon />, path: "/teams" },
    { id: 8, text: "Forms", icon: <IntegrationInstructionsOutlinedIcon />, path: "/forms" },
  ]




  const bottomItems = [
    { text: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  // Function to handle link clicks
  const handleLinkClick = () => {
    if (closeSidebar) closeSidebar(); // Close sidebar only on link click
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        background: '#f5f5f5'
      }}
      onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside sidebar
    >
      {/* TOP MENU */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            component={Link}
            to={item.path}
            onClick={handleLinkClick} // <-- close on link click
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              my: 0.2,
              p: 0.3,
              pl: 0.8, 
              "&.Mui-selected": {
                "& .MuiListItemIcon-root": { color: "#000" }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "#000" }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{color: "#000", p:0,}} primary={<Typography variant="body2">{item.text}</Typography>} />
          </ListItemButton>
        ))}
      </List>


          <Divider sx={{pt: '10px', mb: '10px', display: 'block'}} /> 

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
              p: 0.3,
              pl: 0.8, 
              "&.Mui-selected": {
                "& .MuiListItemIcon-root": { color: "#000" }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "#000" }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{color: "#000", p:0,}} primary={<Typography variant="body2">{item.text}</Typography>} />
          </ListItemButton>
        ))}
      </List>




      <Box sx={{ flexGrow: 1 }} />
      <Divider />

      {/* BOTTOM MENU */}
      <List style={{display: "flex" }}>
        {bottomItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleLinkClick} // <-- close on link click
            sx={{ justifyContent: "flex-start", display: 'flex',  "&:hover": { bgcolor: "#beb3b3" } }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={<Typography variant="body2">{item.text}</Typography>} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
