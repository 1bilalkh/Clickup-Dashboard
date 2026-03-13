import React, { Suspense, lazy } from "react";
import TopBar from "./TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/component/Sidebar";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Tasks = lazy(() => import("./pages/Task.jsx"));
const Calendar = lazy(() => import("./pages/Calendar.jsx"));
const Project = lazy(() => import("./pages/Projects.jsx"));
const Inbox = lazy(() => import("./pages/Inbox.jsx"));
const AI = lazy(() => import("./pages/AI.jsx"));
const Teams = lazy(() => import("./pages/Teams.jsx"));
const Forms = lazy(() => import("./pages/Forms.jsx"));
const Invoice = lazy(() => import("./pages/invoice.jsx"));
const PricePage = lazy(() => import("./pages/Price.jsx"));
const TaskEmployee = lazy(() => import("./pages/TaskEmployee.jsx"));
const TaskManager = lazy(() => import("./pages/TaskManager.jsx"));
const Projectone = lazy(() => import("./pages/Projectone.jsx"));
const Projecttwo = lazy(() => import("./pages/Projecttwo.jsx"));
import { useMediaQuery } from "@mui/material";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const isMobile = useMediaQuery("(min-width:900px)"); // mobile + tablet

  return (
    <>
      <Router>
        <TopBar />
        <Box sx={{ display: "flex" }}>
          {isMobile && <Sidebar />}

          <Box
            sx={{
              flex: 1,
              p: 3,
              flexGrow: 1,
              ml: {
                xs: 0, // mobile
                sm: 0, // tablet
                md: "16.25rem", // desktop
              },
              mt: {
                xs: "30px", // mobile
                sm: 0, // tablet
                md: 0, // desktop
              },
              width: "100%",
            }}
          >
            {/* <UpdateBox /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Tasks" element={<Tasks />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/Projects" element={<Project />} />
                <Route path="/Inbox" element={<Inbox />} />
                <Route path="/AI" element={<AI />} />
                <Route path="/Teams" element={<Teams />} />
                <Route path="/Forms" element={<Forms />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/Price" element={<PricePage />} />
                <Route path="/TaskEmployee" element={<TaskEmployee />} />
                <Route path="/TaskManager" element={<TaskManager />} />
                <Route path="/Projectone" element={<Projectone />} />
                <Route path="/Projecttwo" element={<Projecttwo />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
