import React, { useState } from "react";
import { Box, Grid, Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import DropdownModal from "./DropdownModal"
import SparklineChart from "./DashboardChart"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 3,
}


const boxData = [
  {
    id: 1,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Users",
    short: "Manage all users",
    details: "Here you can create, edit, and delete users from the system.",
    dropdownmodal: <DropdownModal />
    
  },
  {
    id: 2,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Tasks",
    short: "Track daily work",
    details: "View, assign, and update tasks for your team.",
    dropdownmodal: <DropdownModal />
  },
  {
    id: 3,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Calendar",
    short: "Check schedules",
    details: "Manage events, deadlines, and important dates."
  },
  {
    id: 4,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Projects",
    short: "All active projects",
    details: "Create, monitor, and manage project progress."
  },
  {
    id: 5,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Messages",
    short: "View inbox",
    details: "Read and send messages to your team members."
  },
  {
    id: 6,
    icon: <DashboardCustomizeOutlinedIcon />,
    title: "Settings",
    short: "System preferences",
    details: "Update application configuration and preferences."
  },
];

function DashboardBoxes() {
  const [open, setOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);

  const handleOpen = (box) => {
    setActiveBox(box); // store full box object
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveBox(null);
  };
const boxicon = {
    width: "40px",
    height: "40px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ddd",
    borderRadius: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    color: '#673ab7'
  };
  return (
    
    <>
      {/* Boxes */}
      <Grid container spacing={2}>
        {boxData.map((item) => (
          <Grid
              size={{ xs: 12, sm: 12, md: 4 }}
              key={item.id}
            >
            <Box
              onClick={() => handleOpen(item)}
                sx={{
                p: 2,
                height: "auto",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
            <Box sx={{display: 'none'}}>
              {item.userlistshow}
              <Typography fontWeight="600">
                <span style={boxicon}>{item.icon}</span>
              </Typography>
              <Typography fontWeight="600">
                {item.title}
              </Typography>

              {/* Short content */}
              <Typography variant="body2" color="text.secondary">
                {item.short}
              </Typography>
              </Box>
              <Box sx={{width: '100%'}}>
             <SparklineChart />
             </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6">
            {activeBox?.title}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {activeBox?.details}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleClose}
            className="mui-close-btn"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#000",
                p: 0,
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                  borderRadius: "50%",
                  bgcolor: "#f1f1f1",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                  },
                }}
          >
            <CloseIcon fontSize="small" />
          </Button>
           <DropdownModal />
        </Box>
      </Modal>
    </>
  );
}

export default DashboardBoxes;
