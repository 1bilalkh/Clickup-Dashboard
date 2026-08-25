import { useState } from "react";
import { useUser } from "@clerk/react";

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  TextField,
  Stack,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from "@mui/material";

import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";

function Settings() {
  const { user, isLoaded } = useUser();

  const [tab, setTab] = useState(0);

  const [fullName, setFullName] = useState("");

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  if (!isLoaded) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Please sign in.</Typography>
      </Box>
    );
  }

  const currentFullName =
    fullName !== "" ? fullName : user.fullName || "";

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError(false);

      const nameParts = currentFullName.trim().split(" ");

      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await user.update({
        firstName,
        lastName,
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(true);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7f8fa",
        }}
      >
        {/* Settings Header */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1f2937",
              mb: 0.5,
            }}
          >
            Settings
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              mb: 2.5,
            }}
          >
            Manage your profile and account settings
          </Typography>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "48px",

              "& .MuiTab-root": {
                minHeight: "48px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                color: "#6b7280",
                px: 2,
              },

              "& .Mui-selected": {
                color: "#1976d2 !important",
                fontWeight: 600,
              },

              "& .MuiTabs-indicator": {
                height: "2px",
                borderRadius: "2px 2px 0 0",
              },
            }}
          >
            <Tab
              icon={<PersonOutlineOutlinedIcon fontSize="small" />}
              iconPosition="start"
              label="Profile"
            />

            <Tab
              icon={
                <ManageAccountsOutlinedIcon fontSize="small" />
              }
              iconPosition="start"
              label="Account"
            />

            <Tab
              icon={
                <NotificationsNoneOutlinedIcon fontSize="small" />
              }
              iconPosition="start"
              label="Notifications"
            />

            <Tab
              icon={<PaletteOutlinedIcon fontSize="small" />}
              iconPosition="start"
              label="Appearance"
            />
          </Tabs>
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* PROFILE TAB */}
          {tab === 0 && (
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
              }}
            >
              {/* Profile Image */}
              <Box
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  flexWrap: "wrap",
                }}
              >
                <Avatar
                  src={user.imageUrl}
                  alt={user.fullName || "Profile"}
                  sx={{
                    width: 90,
                    height: 90,
                    border: "3px solid #f3f4f6",
                  }}
                />

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Profile photo
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      mb: 1.5,
                    }}
                  >
                    Your profile photo is managed by Clerk.
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      <PhotoCameraOutlinedIcon />
                    }
                    onClick={() => user.openProfile()}
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    Change photo
                  </Button>
                </Box>
              </Box>

              <Divider />

              {/* Personal Information */}
              <Box
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 3,
                }}
              >
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Full name"
                    value={currentFullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                  />

                  <TextField
                    fullWidth
                    label="Email address"
                    value={
                      user.primaryEmailAddress
                        ?.emailAddress || ""
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="Email address is managed by Clerk."
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Save */}
              <Box
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: "#fafafa",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveOutlinedIcon />}
                  onClick={handleSaveChanges}
                  disabled={saving}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 3,
                    fontWeight: 600,
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Paper>
          )}

          {/* ACCOUNT TAB */}
          {tab === 1 && (
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.06)",
                p: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={1}
              >
                Account Settings
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Manage your account information and
                authentication settings.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="User ID"
                  value={user.id}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Paper>
          )}

          {/* NOTIFICATIONS TAB */}
          {tab === 2 && (
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.06)",
                p: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={1}
              >
                Notification Settings
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Manage your notification preferences.
              </Typography>
            </Paper>
          )}

          {/* APPEARANCE TAB */}
          {tab === 3 && (
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.06)",
                p: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={1}
              >
                Appearance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Customize how your dashboard looks.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setMessage("")}
          severity={error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Settings;