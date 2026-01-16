import TopBar from './TopBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar/component/Sidebar';
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Task.jsx";
import Calendar from "./pages/Calendar.jsx";
import Project from "./pages/Projects.jsx";
import Inbox from "./pages/Inbox.jsx"
import AI from "./pages/AI.jsx"
import Teams from "./pages/Teams.jsx"
import Forms from "./pages/Forms.jsx"
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
            <Route path="/Inbox" element={<Inbox />} />
            <Route path="/AI" element={<AI />} />
            <Route path="/Teams" element={<Teams />} />
            <Route path="/Forms" element={<Forms />} />
          </Routes>
          </Box>
          </Box>
       </Router>
    </>
  );
}

export default App;
