import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CustomButton from "../common/Button";

function Teams() {
  const {
    data: team = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error?.message || "Failed to load team members"}
      </Alert>
    );
  }

  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {team.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member._id}>
              <Card sx={{ backgroundColor: "#f9fafc", borderRadius: 2 }}>
                <CardContent>
                  {/* Status */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="text.secondary"
                    >
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
                          member.status === "Active" ? "#e8f5e9" : "#fbe9e7",
                        color:
                          member.status === "Active" ? "#2e7d32" : "#d84315",
                      }}
                    >
                      {member.status}
                    </Box>
                  </Box>
                  {/* Top */}
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
  src={member.avatar}
  alt={member.name}
  sx={{ width: 56, height: 56 }}
>
  {member.name?.charAt(0).toUpperCase()}
</Avatar>

                    <Box>
                      <Typography fontWeight="bold">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>

                  
                  <CustomButton sx={{ mt: 3 }} fullWidth>
                    Learn More
                  </CustomButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Teams;
