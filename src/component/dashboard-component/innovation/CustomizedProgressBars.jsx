import { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* Gradient Styled Progress */
const GradientLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 6,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    borderRadius: 6,
    background: "linear-gradient(90deg, #e01cd5, #1CB5E0)",
  },
}));

function CustomizedProgressBars() {
  const progressData = [
    { label: "Ideas Accepted", value: 15 },
    { label: "Ideas Under Review", value: 45 },
    { label: "Ideas Implemented", value: 75 },
    { label: "Ideas Rejected", value: 90 },
  ];
  const [progress, setProgress] = useState(0);
  /* Animation Effect */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 15) {
          return 15; // stop at 75%
        }
        return oldProgress + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {progressData.map((item, index) => (
        <Box key={index} sx={{ width: "100%", pt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </Typography>

          <GradientLinearProgress
            variant="determinate"
            value={item.value}
            sx={{
              height: 8,
              borderRadius: 5,
            }}
          />
        </Box>
      ))}
    </>
  );
}

export default CustomizedProgressBars;
