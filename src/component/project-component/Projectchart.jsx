import * as React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarChartPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Team Performance
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Bilal", "Ali", "Sara", "Ahmed"],
              },
            ]}
            series={[
              {
                data: [12, 8, 15, 6],
                label: "Completed Tasks",
              },
            ]}
            height={300}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
