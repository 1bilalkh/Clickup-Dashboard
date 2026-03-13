import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import profile1 from "./images/profile-tabs.jpg";
import profile2 from "./images/user-1.jpg";
import profile3 from "./images/user-2.jpg";
import { Typography } from "@mui/material";
import styled from "@mui/system/styled";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Button } from "@mui/material";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#e8eff7",
  border: "1px solid",
  borderColor: "#ced7e0",
  padding: "1px 6px",
  borderRadius: "4px",
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
    borderColor: "#444d58",
  }),
}));

export default function Display() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            sx={{
              width: 50,
              height: 50,
              m: 2,
              borderRadius: "50%",
              backgroundColor: "#ffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#2a5298",
                color: "#fff",
              },
            }}
          >
            <Avatar src={profile1} sx={{ width: 50, height: 50 }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="body1" fontWeight="600">
            Dashboard Qaulity Improvement
          </Typography>
          <Typography variant="body2">
            We are committed to continuous quality improvement by refining
            processes
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 2,
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
          }}
        >
          <Typography variant="body2">Registered Project</Typography>
          <Item sx={{ fontSize: "default" }}>AI Integration</Item>
          <Item sx={{ fontSize: "default" }}>+2 More</Item>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
          }}
        >
          <Typography variant="body2">Recent New Project</Typography>
          <Item sx={{ fontSize: "default" }}>Dashboard Designing</Item>
          <Item sx={{ fontSize: "default" }}>+1 More</Item>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            p: 1,
            borderRadius: "10px",
            display: "flex",
            mt: 2,
            justifyContent: "space-between",
            bgcolor: "#f3f4f6",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
          }}
        >
          <Box>
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src={profile1} />
              <Avatar alt="Travis Howard" src={profile2} />
              <Avatar alt="Cindy Baker" src={profile3} />
            </AvatarGroup>
          </Box>
          <Box>
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
                mt: {
                  xs: 2,
                  sm: 2,
                  md: 0,
                },
              }}
            >
              Book Consultation
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
