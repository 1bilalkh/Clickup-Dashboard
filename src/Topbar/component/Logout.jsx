import React from "react";
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
import { Button } from "@mui/material";
import ThemeContext from "../../ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";



function Logout() {
  const isMobile = useMediaQuery("(max-width:900px)"); // mobile + tablet
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  return (
    <>
        <Box
            sx={{
                display: "flex",   // space between icons
                alignItems: "center"
            }}
        >
          
            {isMobile && <TemporaryDrawer />}

            {/* <p>Current Mode: {mode}</p> */}
             <Tooltip title="Theme Mode">
       
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <DarkModeIcon sx={{ fontSize: "20px" }} /> : <LightModeIcon sx={{ fontSize: "20px" }} />}
            </IconButton>
      </Tooltip>       
          
      <Tooltip title="Notifications">
        <IconButton color="inherit">
          <NotificationsOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Profile">
        <IconButton color="inherit">
          <PersonOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Settings">
        <IconButton color="inherit">
          <SettingsOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help">
        <IconButton color="inherit">
          <HelpOutlineIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      <SignOut />
      
    </Box>
    </>
  )
}

export default Logout