import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function UpcomingMeeting() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      {/* First Heading */}
      <Typography variant="body1" fontWeight={600}>
        Schedule Overview
      </Typography>

      {/* Date & Time Row */}
      <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <span>
            <CalendarMonthOutlinedIcon />
          </span>
          <span>03 March 2026</span>
        </Typography>

        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <span>
            <AccessTimeOutlinedIcon />
          </span>
          <span style={{ paddingLeft: "5px" }}>10:31AM</span>
        </Typography>
      </Stack>
    </Box>
  );
}
