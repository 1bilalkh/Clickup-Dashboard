import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar/component/Sidebar";
import { Box, useMediaQuery } from "@mui/material";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Loading from "./common/Loading.jsx";
import CircularIndeterminate from "./common/ApiLoading.jsx";
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Task = lazy(() => import("./pages/Task.jsx"));
const Settings = lazy(() => import("./pages/settings.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const CreateTask = lazy(() => import("./pages/CreateTask.jsx"));
const Calendar = lazy(() => import("./pages/Calendar.jsx"));
const Project = lazy(() => import("./pages/Projects.jsx"));
const Inbox = lazy(() => import("./pages/Inbox.jsx"));
const AI = lazy(() => import("./pages/AI.jsx"));
const Teams = lazy(() => import("./pages/Teams.jsx"));
const Forms = lazy(() => import("./pages/Forms.jsx"));
const Invoice = lazy(() => import("./pages/invoice.jsx"));
const PricePage = lazy(() => import("./pages/Price.jsx"));
const Projectone = lazy(() => import("./pages/Projectone.jsx"));
const Projecttwo = lazy(() => import("./pages/Projecttwo.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const BookConsultation = lazy(() => import("./pages/BookConsultation.jsx"));
const RegisterProgram = lazy(() => import("./pages/RegisterProgram.jsx"));

function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <>
      <TopBar />
      <Box
        sx={{
         height: {
            xs: '150px',
            md: '75px',
            lg: '75px',
          },
        }}
      >
        Content
      </Box>
      <Box sx={{ display: "flex" }}>
        {isDesktop && <Sidebar />}

        <Box
          sx={{
            flex: 1,
            p: 3,
            width: "100%",
            ml: {
              xs: 0,
              sm: 0,
              md: "16.25rem",
            },
          }}
        >
          <Suspense
            fallback={
              <div>
                <CircularIndeterminate />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/CreateTask" element={<CreateTask />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Projects" element={<Project />} />
              <Route path="/Inbox" element={<Inbox />} />
              <Route path="/AI" element={<AI />} />
              <Route path="/Teams" element={<Teams />} />
              <Route path="/Forms" element={<Forms />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/Price" element={<PricePage />} />
              <Route path="/Projectone" element={<Projectone />} />
              <Route path="/Projecttwo" element={<Projecttwo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/BookConsultation" element={<BookConsultation />} />
              <Route path="/RegisterProgram" element={<RegisterProgram />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </>
  );
}

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box>
          <Loading />
        </Box>
      </Box>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* DASHBOARD */}
        <Route
          path="/*"
          element={
            isSignedIn ? <DashboardLayout /> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
