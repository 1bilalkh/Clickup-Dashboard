import { Drawer } from "@mui/material";

function MobileSidebar({ showBox, setShowBox }) {
  return (
    <Drawer
      anchor="left"
      open={showBox}
      onClose={() => setShowBox(false)}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": { width: 260 },
      }}
    >
      Sidebar Content
    </Drawer>
  );
}

export default MobileSidebar;