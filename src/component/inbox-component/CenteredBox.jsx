import React from "react";
import { Box } from "@mui/material";

export default function CenteredBox() {
  return (
    <>
    <Box
      sx={{
        width: 300,               // Box width
        height: 200,              // Box height
        bgcolor: "lightblue",     // background color
        display: "flex",          // use flexbox
        justifyContent: "center", // horizontal center
        alignItems: "center",     // vertical center
        margin: "auto",           // extra safety
        minHeight: "100vh",       // take full screen height
      }}
    >
      Centered Box
    </Box>
    </>
  );
}
