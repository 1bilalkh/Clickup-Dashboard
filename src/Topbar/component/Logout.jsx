import { Box, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SignOut from "./SignOut";

function Logout() {
  return (
    <>
        <Box
            sx={{
                display: "flex",   // space between icons
                alignItems: "center"
            }}
        >
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