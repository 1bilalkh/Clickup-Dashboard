import { useUser } from "@clerk/react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

function Profile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>Please sign in.</Typography>;
  }

  const email = user.emailAddresses?.[0]?.emailAddress;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Profile
      </Typography>

      <Card sx={{ maxWidth: 700, background: '#fff', boxShadow: 'none' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Profile Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3
            }}
          >
            <Avatar
              src={user.imageUrl}
              alt={user.fullName || user.username || "User"}
              sx={{ width: 80, height: 80 }}
            />

            <Box>
              <Typography variant="h5" fontWeight={700}>
                {user.fullName || user.username || "User"}
              </Typography>

              <Typography color="text.secondary">
                {email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* First Name */}
          <Typography variant="body2" color="text.secondary">
            First Name
          </Typography>

          <Typography mb={2}>
            {user.firstName || "Not provided"}
          </Typography>

          {/* Last Name */}
          <Typography variant="body2" color="text.secondary">
            Last Name
          </Typography>

          <Typography mb={2}>
            {user.lastName || "Not provided"}
          </Typography>

          {/* Username */}
          <Typography variant="body2" color="text.secondary">
            Username
          </Typography>

          <Typography mb={2}>
            {user.username || "Not provided"}
          </Typography>

          {/* Email */}
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>

          <Typography mb={3}>
            {email}
          </Typography>

          
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;