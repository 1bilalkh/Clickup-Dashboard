import React from "react";
import { Box, TextField, Typography, Button, Paper, Grid } from "@mui/material";
import CustomButton from "../common/Button";

export default function RegisterProgram() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#f5f6fa",
        py: 3,
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ py: 1 }}>
        Register Program
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Full Name" name="name" fullWidth required />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              required
            />
          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Phone"
              name="Phone"
              type="phone"
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              required
            />
          </Grid>
         
          <Grid size={12}>
            <CustomButton type="submit">Register</CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
