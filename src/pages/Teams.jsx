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
  Paper
  
} from "@mui/material";
import { styled } from '@mui/material/styles';

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

function Teams() {

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

 const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));     


  return (
    <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            {team.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
               
                    <Card>
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
            </Grid>
    </Box>




      
    </>
  )
}

export default Teams