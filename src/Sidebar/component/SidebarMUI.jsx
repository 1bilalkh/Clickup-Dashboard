import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { Tooltip } from "@mui/material";

function SidebarDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => setOpen(state);

  return (
    <>
     <Tooltip title="Sidebar">
                <IconButton
                  color="inherit"
                  sx={{
                    bgcolor: "#f0f0f2",
                    width: 30,
                    height: 30,
                    color: "text.primary",
                    borderRadius: "10px",
                  }}
                >
      <IconButton color="text.primary" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <Sidebar closeSidebar={() => toggleDrawer(false)} />
      </Drawer>
    </>
  );
}

export default SidebarDrawer;
