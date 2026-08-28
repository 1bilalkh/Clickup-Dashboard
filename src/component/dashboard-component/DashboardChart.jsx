import { Box, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:5000";

export default function SparklineChart() {
  const theme = useTheme();

  const {
    data: loginActivity = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loginActivity"],

    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/login`);

      if (!response.ok) {
        throw new Error("Failed to fetch login activity");
      }

      return response.json();
    },

    // Refresh every 30 seconds
    refetchInterval: 30000,
  });

  // ==========================================
  // SORT LOGIN ACTIVITY BY LOGIN TIME
  // ==========================================

  const sortedActivity = [...loginActivity]
    .filter((item) => item.loginAt)
    .sort(
      (a, b) =>
        new Date(a.loginAt).getTime() -
        new Date(b.loginAt).getTime()
    );

  // ==========================================
  // GROUP LOGINS BY HOUR
  // ==========================================

  const hourlyActivity = {};

  sortedActivity.forEach((item) => {
    const date = new Date(item.loginAt);

    const hour = date.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    });

    hourlyActivity[hour] =
      (hourlyActivity[hour] || 0) + 1;
  });

  // ==========================================
  // CONVERT TO ARRAY
  // ==========================================

  const activityEntries = Object.entries(hourlyActivity);

  // ==========================================
  // CHART DATA
  // ==========================================

  let chartData;
  let labels;

  if (activityEntries.length >= 2) {
    labels = activityEntries.map(
      ([hour]) => hour
    );

    chartData = activityEntries.map(
      ([, count]) => count
    );
  } else if (activityEntries.length === 1) {
    labels = [
      "",
      activityEntries[0][0],
    ];

    chartData = [
      0,
      activityEntries[0][1],
    ];
  } else {
    // Fallback when there is no login data
    labels = [
      "",
      "",
      "",
      "",
      "",
    ];

    chartData = [
      1,
      2,
      1,
      3,
      2,
    ];
  }

  // ==========================================
  // MAX VALUE
  // ==========================================

  const maxValue = Math.max(
    ...chartData,
    1
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 90,
        }}
      />
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 90,
        }}
      />
    );
  }

  // ==========================================
  // CHART
  // ==========================================

  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LineChart
        height={90}
        series={[
  {
    id: "loginActivity",
    data: chartData,
    curve: "natural",
    showMark: false,
    color: theme.palette.primary.main,

    valueFormatter: (value) =>
      `${value} ${value === 1 ? "login" : "logins"}`,
  },
]}

        // ======================================
        // X AXIS
        // ======================================

        xAxis={[
          {
            scaleType: "point",
            data: labels,

            // Completely hide axis
            position: "none",

            // Don't show X value in tooltip
            // because we want a clean tooltip
            hideTooltip: false,
          },
        ]}

        // ======================================
        // Y AXIS
        // ======================================

        yAxis={[
          {
            min: 0,
            max: maxValue + 1,
            position: "none",
          },
        ]}

        // ======================================
        // NO GRID
        // ======================================

        grid={{
          horizontal: false,
          vertical: false,
        }}

        // ======================================
        // SPACING
        // ======================================

        margin={{
          top: 6,
          bottom: 8,
          left: 2,
          right: 2,
        }}

        // ======================================
        // NO LEGEND
        // ======================================

        hideLegend

        // ======================================
        // MUI X CHARTS v8 TOOLTIP
        // ======================================

        slotProps={{
          tooltip: {
            trigger: "axis",

            // Tooltip styling
            sx: {
              "& .MuiChartsTooltip-paper": {
                borderRadius: "10px",
                backgroundColor:
                  theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow:
                  theme.shadows[4],
              },

              "& .MuiChartsTooltip-labelCell": {
                color:
                  theme.palette.text.secondary,
                fontSize: "11px",
              },

              "& .MuiChartsTooltip-valueCell": {
                color:
                  theme.palette.text.primary,
                fontWeight: 600,
                fontSize: "13px",
              },
            },
          },
        }}

        // ======================================
        // CHART STYLING
        // ======================================

        sx={{
          width: "100%",

          // ------------------------------------
          // THIN SMOOTH LINE
          // ------------------------------------

          "& .MuiLineElement-root": {
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },

          
          // ------------------------------------
          // HIDE AXES
          // ------------------------------------

          "& .MuiChartsAxis-root": {
            display: "none",
          },

          // ------------------------------------
          // HIDE GRID
          // ------------------------------------

          "& .MuiChartsGrid-line": {
            display: "none",
          },

          // ------------------------------------
          // HIDE MARKS / DOTS
          // ------------------------------------

          "& .MuiMarkElement-root": {
            display: "none",
          },

          // ------------------------------------
          // HIDE AXIS HIGHLIGHT LINE
          // ------------------------------------

          "& .MuiChartsAxisHighlight-root": {
            display: "none",
          },
        }}
      />
    </Box>
  );
}