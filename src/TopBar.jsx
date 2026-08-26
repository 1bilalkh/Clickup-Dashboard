import React from "react";
import { Box } from "@mui/material";
import SearchBar from "./Topbar/component/SearchBar";
import { Typography } from "@mui/material";
import Logout from "./Topbar/component/Logout";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

//import ElevateAppBar from "./FixedBar"

//import logo from "./assets/logo.png"

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function TopBar() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.paper",
          color: "#000",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={(theme) => ({
              py: 2,
              px: 2,
              mt: 2,
              mb: 0,
              borderRadius: "20px",
              flexDirection: {
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))"
                    : "linear-gradient(to right, rgb(18, 18, 18), rgb(20, 45, 55))",
                height: "auto",
                xs: "column", // mobile
                sm: "column", // small tablets
                md: "row",
                gap: "5px",
                zIndex: 1200, //
              },
            })}
          >
            <div>
              <Typography variant="h5" sx={{color: "text.secondary"}}>
                <strong>CRM Dashboard</strong>
              </Typography>
            </div>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
              }}
            >
              <SearchBar />
            </Box>
            <div>
              <Logout />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopBar;
