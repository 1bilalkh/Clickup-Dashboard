import { Grid, Box, Typography, IconButton, Paper } from "@mui/material";
import NorthEastOutlinedIcon from "@mui/icons-material/NorthEastOutlined";

export default function WelcomeSection() {
  return (
    <Grid item xs={12} md={12}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: "100%",
          boxShadow: "none",
          background: "none",
          color: "#fff",
        }}
      >
        {/* Top Section */}
        <Box sx={{ width: "100%", textAlign: "left", p: 3, pb: 14 }}>
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            Welcome to Innovation Program Dashboard
          </Typography>

          <Typography variant="h5" fontWeight="700">
            Welcome, Dashboard
          </Typography>
        </Box>

        {/* Space Between */}
        <Box sx={{ mt: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(to right, #2a5298, #1e3c72);",
            p: 2,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography variant="h6" fontWeight="600">
              Explore Your Project
            </Typography>

            <Typography variant="body1" sx={{ color: "white" }}>
              Boost productivity with AI-powered insights and smart automation.
            </Typography>
          </Box>

          {/* Right Side Icon */}
          <IconButton
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#ffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#2a5298",
                color: "#fff",
              },
            }}
          >
            <NorthEastOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
}
