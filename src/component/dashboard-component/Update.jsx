import { Box, Typography, Button } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UpdateBox() {
  const [showBox, setShowBox] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBox(true);
    }, 9000); // 4 seconds

    return () => clearTimeout(timer); // cleanup
  }, [location.pathname]);
  return (
    <>
    {showBox && (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2.5,
        borderRadius: 8,
        border: "1px solid #e0e0e0",
        backgroundColor: "#6c5cf5",
        flexWrap: "wrap", // responsive
        gap: 2,
        mb: 3
      }}
    >
      {/* LEFT CONTENT */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{color: '#fff'}}>
          New Update Available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{color: '#ffff'}}>
          Upgrade now to unlock premium features
        </Typography>
      </Box>

      {/* RIGHT BUTTON */}
      <Box  sx={{
        display: "flex",
        alignItems: "center", gap: '10px'}}>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          px: 3,
          borderRadius: 2,
          background: '#fff',
          width: '150px',
          color: '#000'
          
        }}
      >
        Upgrade Now
      </Button>
      <CloseOutlinedIcon sx={{color: '#fff', cursor: 'pointer'}} onClick={() => setShowBox(false)} />
      </Box>
    </Box>
    )}
    </>
  );
}
