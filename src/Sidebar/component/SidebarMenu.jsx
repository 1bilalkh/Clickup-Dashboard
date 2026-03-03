import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export default function SidebarMenu() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: 250 }}>
        {/* Simple Item */}
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Dropdown Parent */}
        <ListItemButton onClick={handleDropdown}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openDropdown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Dropdown Children */}
        <Collapse in={openDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Add Product" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="All Products" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
