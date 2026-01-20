import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

function SidebarDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => setOpen(state);

  return (
    <>
      <IconButton onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Sidebar closeSidebar={() => toggleDrawer(false)} />
      </Drawer>
    </>
  );
}

export default SidebarDrawer;
