import { Box, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function SparklineChart() {
  return (
    <Box
      sx={{
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Active Users
      </Typography>

      <Typography variant="h6" fontWeight={600}>
        8,245
      </Typography>

      <SparkLineChart 
        data={[120, 140, 135, 160, 155, 180, 195]}
        height={50}
        curve="smooth"
        colors={["#1976d2"]}
      />
    </Box>
  );
}
