import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Price = ({ low, price }) => {
  const features = [
    "AI Answer Engine Powered by ChatGPT",
    "Track Up to 40 Prompts",
    "Create 2 AI Generated Contents",
    "Analyze 1,200 AI Responses",
    "Unlimited Outreach Opportunities",
    "Unlimited Content Opportunities",
    "Brand Sentiment Tracking",
    "Complete Historical Data",
    "Automated Daily Monitoring",
    "Google Search Console (GSC) Integration",
  ];

  return (
    <>
      <Box
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          border: 1,
          borderRadius: 4,
          borderColor: "#c1c2c5",
          flexDirection: { xs: "column", sm: "column", md: "column" },
        }}
      >
        {/* Title */}
        <Box mb={2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#212529",
              mb: 0.5,
              textAlign: "center",
            }}
          >
            {low}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#6C757D",
              textAlign: "center",
            }}
          >
            For Software agencies and Developers.
          </Typography>
        </Box>

        {/* Price */}
        <Box mb={2}>
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={1}
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 700,
                color: "#212529",
                textAlign: "center",
              }}
            >
              {price}
            </Typography>

            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#6C757D" }}
            >
              / Protocol / mo
            </Typography>
          </Stack>
        </Box>

        {/* Button */}
        <Box mb={3}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#1959D9",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              "&:hover": { bgcolor: "#0443C7" },
            }}
          >
            Try Free For 7 Days
          </Button>
        </Box>

        {/* Logo Section */}

        {/* Features */}
        <Stack spacing={1.5}>
          {features.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <CheckIcon sx={{ color: "#0554F2", fontSize: 20 }} />
              <Typography sx={{ fontSize: 14, color: "#212529" }}>
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Price;
