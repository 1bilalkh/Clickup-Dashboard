import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button,
  Grid,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PageGrid from "../grid-component/Grids"

function TeamComp() {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Bilal Khan",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "Active",
    },
    {
      id: 2,
      name: "Ali Ahmed",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "Active",
    },
    {
      id: 3,
      name: "Sara Malik",
      role: "Project Manager",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "Offline",
    },
    {
      id: 4,
      name: "John Doe",
      role: "UI/UX Developer",
      avatar: "https://i.pravatar.cc/150?img=11",
      status: "Active",
    },
  ]);

    // ✅ Delete member (uses setTeam → warning fixed)
    const handleDelete = (id) => {
        setTeam((prev) => prev.filter((member) => member.id !== id));
    };

  // ✅ Add member example
  const handleAddMember = () => {
    setTeam((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "New Member",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?img=12",
        status: "Active",
      },
    ]);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Team</Typography>

        <Button
          variant="contained"
          startIcon={<GroupAddIcon />}
          onClick={handleAddMember}
        >
          Add Member
        </Button>
      </Box>

      {/* Team List */}
      <Grid container spacing={2}>
            <PageGrid>
        {team.map((member) => (
          <Grid
            key={member.id}   // ✅ correct key placement
           >
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                {/* Top */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    src={member.avatar}
                    sx={{ width: 56, height: 56 }}
                  />

                  <Box>
                    <Typography fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>

                {/* Status */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>

                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "12px",
                      fontWeight: 600,
                      bgcolor:
                        member.status === "Active"
                          ? "#e8f5e9"
                          : "#fbe9e7",
                      color:
                        member.status === "Active"
                          ? "#2e7d32"
                          : "#d84315",
                    }}
                  >
                    {member.status}
                  </Box>
                </Box>

                {/* Actions */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Actions
                  </Typography>

                  <Box display="flex">
                    <IconButton sx={{ px: "6px" }}>
                      <VisibilityIcon sx={{ fontSize: "18px", color: "#000" }} />
                    </IconButton>

                    <IconButton sx={{ px: "6px" }}>
                      <EditIcon sx={{ fontSize: "18px", color: "#000" }} />
                    </IconButton>

                    <IconButton
                      sx={{ px: "6px" }}
                      onClick={() => handleDelete(member.id)}
                    >
                      <DeleteIcon sx={{ fontSize: "18px", color: "#000" }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
            </PageGrid>    
      </Grid>
    </Box>
  );
}

export default TeamComp;
