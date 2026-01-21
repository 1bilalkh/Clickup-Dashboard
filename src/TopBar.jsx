import { Box } from "@mui/material";
import SearchBar from "./Topbar/component/SearchBar";
import { Typography } from "@mui/material";
import Logout from "./Topbar/component/Logout";

function TopBar() {
  return (
    <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{  borderBottom: "1px solid #e0e0e0", p: 1,
              flexDirection: {
                xs: "column",   // mobile
                sm: "column",   // small tablets
                md: "row", gap: '5px',  // desktop+
              },
            
            
            
             }}
            
           
            >
            <div><Typography variant="body3" sx={{pb:0, backgroundColor: "#f5f5f5", p: 0.5, fontWeight: 500, borderRadius: "4px" }}>Dashboard WorkSpace</Typography></div>
            <div><SearchBar /></div>
            <div><Logout /></div>
            </Box>
    </>
  )
}

export default TopBar