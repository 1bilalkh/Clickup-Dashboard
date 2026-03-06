import { Typography, Box } from "@mui/material";
import CustomizedProgressBars from "./CustomizedProgressBars";

export default function InnovationPerformance() {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Innovation Index</Typography>
        <CustomizedProgressBars />
      </Box>
    </>
  );
}
