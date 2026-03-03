import { useState } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import ChooseTemplate from "../component/dashboard-component/ChooseTemplate";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DashboardBoxes from "../component/dashboard-component/DashboardModal";
//import DifferentLength from "../component/dashboard-component/DashboardBigChart";
//import PieChartWithCustomizedLabel from "../component/dashboard-component/Dashboard-pie.jsx";
import TableComponentComplete from "../component/formscomponent/DynamicTable.jsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import WelcomeSection from "../Welcom.jsx";
import AnimatedTabs from "../component/dashboard-component/Tabs-Component.jsx";
import QuickActions from "../component/dashboard-component/quick-actions/QuickActions.jsx";
import Schedule from "../component/dashboard-component/calendar-schedule/Schedules.jsx";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Dashboard() {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            flexGrow: 1,
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h6">Choose a Dashboard template</Typography>
            <Typography variant="body2">
              Get started with a Dashboard template or create a custom Dashboard
              to fit your exact needs.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #0D47A1 90%)",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1E88E5 30%, #08306B 90%)",
                },
              }}
              startIcon={<CalendarMonthIcon />}
            >
              Book Consultation
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #0D47A1 90%)",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1E88E5 30%, #08306B 90%)",
                },
              }}
              startIcon={<PermContactCalendarIcon />}
            >
              Register Program
            </Button>
          </Box>
        </Box>

        <br />
        <Box>
          <DashboardBoxes />
        </Box>
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Item
                  sx={{
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #0D47A1 90%)",
                    color: "#fff",
                    p: 0,
                  }}
                >
                 
                  <WelcomeSection />
                </Item>
              </Grid>
              {/* start tabs */}
              <Grid size={{ xs: 12, md: 12 }}>
                <Box
                  sx={{
                    p: 2,
                    height: "auto",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    bgcolor: "#f4f9fd",
                    mt: 3
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ mb: 2, mt: 1 }}
                  >
                    Recent Activity
                  </Typography>
                  <AnimatedTabs />
                </Box>
              </Grid>
              <Box
                sx={{
                  p: 2,
                  mt: 2,
                  height: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "#f4f9fd",
                }}
              >
                <TableComponentComplete />
              </Box>
            </Grid>
            {/* end col md - 4 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Box sx={{ bgcolor: "#f4f9fd", p: 2, borderRadius: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quick Actions
                  </Typography>
                  <QuickActions />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 12}}>
                <Box sx={{ bgcolor: "#f4f9fd", p: 2, borderRadius: 4, mt: 2  }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    My Schedules
                  </Typography>
                   <Schedule />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
