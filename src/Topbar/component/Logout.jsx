import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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
          <NotificationsOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Profile">
        <IconButton>
          <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Settings">
        <IconButton>
          <SettingsOutlinedIcon sx={{ fontSize: "20px" }} />
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