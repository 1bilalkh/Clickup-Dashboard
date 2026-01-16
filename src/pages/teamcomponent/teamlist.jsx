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
      role: "UI UX Developer",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "Online",
    },
  ]);

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
        >
          Add Member
        </Button>
      </Box>

      {/* Team List */}
      <Grid container spacing={2}>
       {team.map((member) => (
        <Grid size={3} sx={{
             transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}>
          
               
          <Card
            key={member.id}
            
          >
            <CardContent>
              {/* Top Section */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
              >
                <Avatar
                  src={member.avatar}
                  sx={{ width: 56, height: 56 }}
                />

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
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
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="body1" color="text.secondary">
                  Status
                </Typography>

                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 12,
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
                <Typography variant="body1" color="text.secondary">
                  Actions
                </Typography>

                <Box display="flex">
                  <IconButton  sx={{ color: "black", fontSize: "9px" }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton  sx={{ color: "black", fontSize: "9px" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton  sx={{ color: "black", fontSize: "9px" }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        
          
        </Grid>
         ))}
      </Grid>
     
    </Box>
    
  );
}

export default TeamComp;
