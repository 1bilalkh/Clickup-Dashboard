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
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function Sidebar({ closeSidebar }) {
  const location = useLocation();

  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
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
          text: "Task Employee",
          path: "/add-product",
        },
        {
          id: 13,
          text: "Task Manager",
          path: "/all-products",
        },
      ],
      path: "/tasks",
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
      children: [
        {
          id: 12,
          text: "Project One",
          path: "/add-product",
        },
        {
          id: 13,
          text: "Project Two",
          path: "/all-products",
        },
      ],
      path: "/projects",
    },
  ];

  const menuItemsCenter = [
    { id: 5, text: "Inbox", icon: <MailOutlinedIcon />, path: "/inbox" },
    { id: 6, text: "AI", icon: <AttractionsOutlinedIcon />, path: "/ai" },
    {
      id: 7,
      text: "Teams",
      icon: <PeopleOutlineOutlinedIcon />,
      path: "/teams",
    },
    {
      id: 8,
      text: "Forms",
      icon: <IntegrationInstructionsOutlinedIcon />,
      path: "/forms",
    },
    {
      id: 9,
      text: "Invoice",
      icon: <DescriptionOutlinedIcon />,
      path: "/invoice",
    },
    {
      id: 10,
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
      path: "/settings",
    },
    { id: 11, text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  // Function to handle link clicks
  const handleLinkClick = () => {
    if (closeSidebar) closeSidebar(); // Close sidebar only on link click
  };

  return (
    <>
      <Box
        sx={{
          width: 250,
          display: "flex",
          position: "fixed",
          flexDirection: "column",
          borderRight: "1px solid #ddd",
          background: "linear-gradient(to right, #ffffff, #e0f7ff)",
          color: "text.primary",
          top: 0,
          overflowY: "auto",
              height: {
                xs: "calc(100vh - 0px)",
                sm: "calc(100vh - 0px)",
                md: "calc(100vh - 104px)"
              },
          mt: {
            xs: 0,
            sm: 0,
            md: "88px",
            lg: "88px"
          },
          ml: {
            xs: 0,
            sm: 0,
            md: "20px",
            lg: "20px"
          },
          mb: {
            xs: 0,
            sm: 0,
            md: "20px",
            lg: "20px"
          },
          pt: {
            xs: 0,
            sm: 0,
            md: "2px",
            lg: "2px"
          },
          borderRadius: {
            xs: "0px",
            sm: "0px",
            md: "20px",
            lg: "20px"
          },





        }}
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside sidebar
      >
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
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>

                <ListItemText
                  primary={<Typography variant="body2">{item.text}</Typography>}
                />

                {/* Show arrow only if dropdown */}
                {item.children &&
                  (openId === item.id ? <ExpandLess /> : <ExpandMore />)}
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
          <Box sx={{display: 'flex', width: '100%', justifyContent:'center', flexDirection:'column', alignItems:'center', py:2}}>
               <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
                >
                Points Earned
              </Typography>
               <Typography
                variant="h6"
                fontWeight={800}
                sx={{ display: "flex", alignItems: "center", color: '#0068a7' }}
                >
                2,450
              </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />

        {/* BOTTOM MENU */}
        <List style={{ display: "flex" }}>
          {bottomItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleLinkClick} // <-- close on link click
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
        </List>
       
      </Box>
    </>
  );
}

export default Sidebar;
