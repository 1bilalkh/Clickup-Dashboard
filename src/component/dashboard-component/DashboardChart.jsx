import { Box, Typography,  useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function SparklineChart() {
  const theme = useTheme();
  return (
    <Box
      sx={{
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Active Users
      </Typography>

      <Typography variant="h6" fontWeight={800}>
        124,512
      </Typography>

      <SparkLineChart 
        data={[100, 140, 135, 160, 105, 190, 125]}
        height={50}
        curve="smooth"
        colors={[theme.palette.primary.main]}
      />
    </Box>
  );
}
