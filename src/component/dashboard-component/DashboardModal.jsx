import { Box, Grid, Typography, Modal, IconButton } from "@mui/material";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";

import SparklineChart from "./DashboardChart";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/usersApi";
import { useState } from "react";

function DashboardBoxes() {
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
  });

  // Loading state
  if (isLoading) {
    return <Typography>Loading users...</Typography>;
  }

  // Error state
  if (isError) {
    return (
      <Typography color="error">
        Failed to load users: {error?.message}
      </Typography>
    );
  }

  // Success
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <Box
            sx={{
              p: 2,
              height: "auto",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "text.primary",

              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Box
              onClick={() => setOpenUsersModal(true)}
              sx={{
                display: "block",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Users information */}
                <span>
                  <Typography color="text.primary" fontWeight="600">
                    Show All Users
                  </Typography>
                </span>

                {/* User icon */}
                <span>
                  <span className="icon_circle">
                    <Badge
                      color="secondary"
                      overlap="circular"
                      badgeContent={users.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          top: "-9px",
                          right: 5,
                        },
                      }}
                    >
                      <Person3OutlinedIcon />
                    </Badge>
                  </span>
                </span>
              </Box>
            </Box>

            {/* Chart */}
            <Box sx={{ width: "100%" }}>
              <SparklineChart />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal open={openUsersModal} onClose={() => setOpenUsersModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: 500,
            },
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
            outline: "none",
          }}
        >
          {/* Modal Header */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600} color="text.primary">
              All Users
            </Typography>

            <IconButton onClick={() => setOpenUsersModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Users */}

          <Box>
            {users.length === 0 ? (
              <Typography color="text.secondary">No users found.</Typography>
            ) : (
              users.map((user) => (
                <Box
                  key={user._id || user.clerkId || user.email}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: "action.hover",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 600,
                    }}
                  >
                    {(user.name || user.firstName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </Box>

                  <Box>
                    <Typography fontWeight={600} color="text.primary">
                      {user.name ||
                        `${user.firstName || ""} ${
                          user.lastName || ""
                        }`.trim() ||
                        "Unnamed User"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {user.email || "No email"}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DashboardBoxes;
