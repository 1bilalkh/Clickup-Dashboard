import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TaskIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Typography } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from "@mui/icons-material/Logout";


function Sidebar( ) {
    
 

  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const menuItems = [
    {id: 1, text: <Typography variant="body2">Dashboard</Typography>, icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
    {id: 2, text: <Typography variant="body2">Tasks</Typography>, icon: <TaskIcon />, path: "/tasks" },
    {id: 3, text: <Typography variant="body2">Calendar</Typography>, icon: <CalendarMonthOutlinedIcon />, path: "/calendar" },
    {id: 4, text: <Typography variant="body2">Projects</Typography>, icon: <FolderOpenOutlinedIcon />, path: "/projects" },
    {id: 5, text: <Typography variant="body2">Inbox</Typography>, icon: <MailOutlinedIcon />, path: "/inbox" },
    {id: 6, text: <Typography variant="body2">AI</Typography>, icon: <AttractionsOutlinedIcon />, path: "/ai" },
    {id: 7, text: <Typography variant="body2">Teams</Typography>, icon: <PeopleOutlineOutlinedIcon />, path: "/teams" },
    {id: 8, text: <Typography variant="body2">Forms</Typography>, icon: <IntegrationInstructionsOutlinedIcon />, path: "/forms" },
  ];

  const bottomItems = [
      { text: <Typography variant="body2">Settings</Typography> , icon: <SettingsOutlinedIcon />, path: "/settings" },
      { text: <Typography variant="body2">Logout</Typography>, icon: <LogoutIcon />, path: "/logout" },
  ];

  const location = useLocation();
  
  return (
    <Box sx={{
        width: "250px", 
        height: "100vh", }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.id}
            selected={location.pathname === item.path}
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
              flexDirection: "row",
              
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "inherit", pr: -1}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{fontSize: "10px", pr: 1 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
