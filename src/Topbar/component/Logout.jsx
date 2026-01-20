import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SignOut from "./SignOut";
//import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
//import Parent from "../../../Parent.jsx"
import TemporaryDrawer from '../../Sidebar/component/SidebarMUI';
import { useMediaQuery } from "@mui/material";



function Logout() {
  const isMobile = useMediaQuery("(max-width:900px)"); // mobile + tablet
  return (
    <>
        <Box
            sx={{
                display: "flex",   // space between icons
                alignItems: "center"
            }}
        >
          
            {isMobile && <TemporaryDrawer />}
          
      <Tooltip title="Notifications">
        <IconButton>
          <NotificationsIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Profile">
        <IconButton>
          <PersonIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Settings">
        <IconButton>
          <SettingsIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help">
        <IconButton>
          <HelpOutlineIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      <SignOut />
      
    </Box>
    </>
  )
}

export default Logout