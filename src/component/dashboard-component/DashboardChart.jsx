import { Box, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

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

    refetchInterval: 30000,
  });

  // -----------------------------
  // SORT LOGIN DATA
  // -----------------------------

  const sortedActivity = [...loginActivity]
    .filter((item) => item.loginAt)
    .sort(
      (a, b) =>
        new Date(a.loginAt).getTime() -
        new Date(b.loginAt).getTime()
    );

  // -----------------------------
  // GROUP BY HOUR
  // -----------------------------

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

  const activityEntries = Object.entries(hourlyActivity);

  // -----------------------------
  // CHART DATA
  // -----------------------------

  let labels = [];
  let chartData = [];

  if (activityEntries.length >= 2) {
    labels = activityEntries.map(([hour]) => hour);

    chartData = activityEntries.map(
      ([, count]) => count
    );
  } else if (activityEntries.length === 1) {
    labels = ["", activityEntries[0][0]];

    chartData = [0, activityEntries[0][1]];
  } else {
    // Empty dashboard chart
    labels = ["", "", "", "", ""];

    chartData = [1, 2, 1, 3, 2];
  }

  const maxValue = Math.max(...chartData, 1);

  // -----------------------------
  // LOADING
  // -----------------------------

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 70,
        }}
      />
    );
  }

  // -----------------------------
  // ERROR
  // -----------------------------

  if (isError) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 70,
        }}
      />
    );
  }

  // -----------------------------
  // CHART
  // -----------------------------

  return (
    <Box
      sx={{
        width: "100%",
        height: 70,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <LineChart
        width={undefined}
        height={70}
        series={[
          {
            id: "loginActivity",
            data: chartData,
            curve: "natural",
            showMark: false,
            color: theme.palette.primary.main,

            valueFormatter: (value) =>
              `${value} ${
                value === 1 ? "login" : "logins"
              }`,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: labels,
            position: "none",
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: maxValue + 1,
            position: "none",
          },
        ]}
        grid={{
          horizontal: false,
          vertical: false,
        }}
        margin={{
          top: 5,
          bottom: 5,
          left: 0,
          right: 0,
        }}
        hideLegend
        slotProps={{
          tooltip: {
            trigger: "axis",
          },
        }}
        sx={{
          width: "100%",
          maxWidth: "100%",

          "& .MuiLineElement-root": {
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },

          "& .MuiChartsAxis-root": {
            display: "none",
          },

          "& .MuiChartsGrid-line": {
            display: "none",
          },

          "& .MuiMarkElement-root": {
            display: "none",
          },

          "& .MuiChartsAxisHighlight-root": {
            display: "none",
          },
        }}
      />
    </Box>
  );
}