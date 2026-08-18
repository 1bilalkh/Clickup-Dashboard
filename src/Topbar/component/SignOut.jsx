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
import { useClerk, useUser } from "@clerk/react";
import { Link } from "react-router-dom";

function SignOut() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
    const { signOut } = useClerk();
    const { isSignedIn } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      {/* Icon to open menu */}
      
      <Tooltip title="Settings">
        <IconButton
          color="inherit"
          sx={{
            bgcolor: "#f0f0f2",
            width: 30,
            height: 30,
            color: "#747980",
            borderRadius: "10px",
          }}
          onClick={handleClick}
        >
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
          <Typography
  component={Link}
  to="/profile"
  sx={{
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  }}
>
  Profile
</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {isSignedIn && (
            <Typography variant="inherit"  onClick={() => signOut({ redirectUrl: "/signin" })}>Sign Out</Typography>
          
      )}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default SignOut;
