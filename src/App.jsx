import TopBar from "./TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/component/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Task.jsx";
import Calendar from "./pages/Calendar.jsx";
import Project from "./pages/Projects.jsx";
import Inbox from "./pages/Inbox.jsx";
import AI from "./pages/AI.jsx";
import Teams from "./pages/Teams.jsx";
import Forms from "./pages/Forms.jsx";
import Invoice from "./pages/invoice.jsx";
import PricePage from "./pages/Price.jsx";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
//import UpdateBox from "./component/dashboard-component/Update.jsx"

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
              width: "100%",
            }}
          >
            {/* <UpdateBox /> */}

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
            </Routes>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
