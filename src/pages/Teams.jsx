import { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";
import CustomButton from "../common/Button";

function Teams() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    data: team = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleViewDetails = (member) => {
    setSelectedUser(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {team.map((member) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={member._id}
            >
              <Card
                sx={{
                  backgroundColor: "#f9fafc",
                  borderRadius: 2,
                }}
              >
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

                    <Chip
                      label={member.status || "Active"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor:
                          member.status === "Offline"
                            ? "#fbe9e7"
                            : "#e8f5e9",
                        color:
                          member.status === "Offline"
                            ? "#d84315"
                            : "#2e7d32",
                      }}
                    />
                  </Box>

                  {/* User */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={2}
                  >
                    <Avatar
                      src={member.imageUrl}
                      alt={member.name}
                      sx={{
                        width: 56,
                        height: 56,
                      }}
                    >
                      {member.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>
                      <Typography fontWeight="bold">
                        {member.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>

                  {/* View Details */}
                  <CustomButton
                    sx={{ mt: 3 }}
                    fullWidth
                    onClick={() => handleViewDetails(member)}
                  >
                    View Details
                  </CustomButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Details Popup */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Team Member Details
        </DialogTitle>

        <DialogContent>
          {selectedUser && (
            <Box sx={{ textAlign: "center", pt: 2 }}>
              <Avatar
                src={selectedUser.imageUrl}
                alt={selectedUser.name}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {selectedUser.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                {selectedUser.name}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                {selectedUser.role}
              </Typography>

              <Box sx={{ textAlign: "left" }}>
                <Typography fontWeight={700}>
                  Email
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {selectedUser.email}
                </Typography>

                <Typography fontWeight={700}>
                  Status
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={selectedUser.status || "Active"}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor:
                        selectedUser.status === "Offline"
                          ? "#fbe9e7"
                          : "#e8f5e9",
                      color:
                        selectedUser.status === "Offline"
                          ? "#d84315"
                          : "#2e7d32",
                    }}
                  />
                </Box>

                <Typography fontWeight={700}>
                  User ID
                </Typography>

                <Typography color="text.secondary">
                  {selectedUser._id || selectedUser.id}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Teams;