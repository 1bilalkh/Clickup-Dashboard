import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function SignOut() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      {/* Icon to open menu */}
      <Tooltip title="Settings">
        <IconButton>
          <SettingsIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Tooltip>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { minWidth: 180, fontSize: "0.875rem" } }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Account</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default SignOut;
