import TopBar from './TopBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar/component/Sidebar';
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Task.jsx";
import Calendar from "./pages/Calendar.jsx";
import Project from "./pages/Projects.jsx";
import { Box } from "@mui/material";




function App() {
  return (
    <>
    <Router>
      <TopBar />
      <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 3,flexGrow: 1,
          height: "100vh",
          overflowY: "auto" // space for right sidebar
           }}>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/Projects" element={<Project />} />
          </Routes>
          </Box>
          </Box>
       </Router>
    </>
  );
}

export default App;
