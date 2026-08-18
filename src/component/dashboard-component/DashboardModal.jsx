import { Box, Grid, Typography } from "@mui/material";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import Badge from "@mui/material/Badge";

import SparklineChart from "./DashboardChart";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/usersApi";

function DashboardBoxes() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
  });

  // Loading state
  if (isLoading) {
    return <Typography>Loading users...</Typography>;
  }

  // Error state
  if (isError) {
    return (
      <Typography color="error">
        Failed to load users: {error?.message}
      </Typography>
    );
  }

  // Success
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 3 }}>
        <Box
          sx={{
            p: 2,
            height: "auto",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            cursor: "pointer",
            bgcolor: "#f4f7fe",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Box sx={{ display: "block" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Users information */}
              <span>
                <Typography
                  color="text.secondary"
                  fontWeight="600"
                >
                  Users
                </Typography>
              </span>

              {/* User icon */}
              <span>
                <span className="icon_circle">
                  
                  <Badge
                  color="secondary"
                  overlap="circular"
                  badgeContent={users.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      top: '-9px',
                      right: 5,
                    },
                  }}
                >
                  <Person3OutlinedIcon />
                </Badge>
                </span>
                
              </span>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ width: "100%" }}>
            <SparklineChart />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DashboardBoxes;