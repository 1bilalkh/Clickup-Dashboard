import React from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import CustomButton from "../common/Button";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterProgram() {
  const API_URL = "http://localhost:5000";
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const registrationData = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      program: data.get("program"),
      programType: data.get("programType"),
      startDate: data.get("startDate"),
      preferredTime: data.get("preferredTime"),
      status: data.get("status"),
      notes: data.get("notes"),
    };

    try {
      const response = await fetch(
        `${API_URL}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register program");
      }

      const result = await response.json();

      console.log("Registration saved:", result);

      // Refresh registration data used by Dashboard
      await queryClient.invalidateQueries({
        queryKey: ["registrations"],
      });

      // Refresh the page and clear the form
      window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "background.default",
        py: 3,
        px: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{ py: 1 }}
      >
        Register Program
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          {/* Full Name */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              required
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              fullWidth
              required
            />
          </Grid>

          {/* Program */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Select Program"
              name="program"
              fullWidth
              required
            >
              <MenuItem value="React Development">
                React Development
              </MenuItem>

              <MenuItem value="UI/UX Design">
                UI/UX Design
              </MenuItem>

              <MenuItem value="Frontend Development">
                Frontend Development
              </MenuItem>

              <MenuItem value="Full Stack Development">
                Full Stack Development
              </MenuItem>
            </TextField>
          </Grid>

          {/* Program Type */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Program Type"
              name="programType"
              fullWidth
              required
            >
              <MenuItem value="Online">
                Online
              </MenuItem>

              <MenuItem value="Onsite">
                Onsite
              </MenuItem>

              <MenuItem value="Hybrid">
                Hybrid
              </MenuItem>
            </TextField>
          </Grid>

          {/* Start Date */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Preferred Time */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Preferred Time"
              name="preferredTime"
              fullWidth
            >
              <MenuItem value="Morning">
                Morning
              </MenuItem>

              <MenuItem value="Afternoon">
                Afternoon
              </MenuItem>

              <MenuItem value="Evening">
                Evening
              </MenuItem>
            </TextField>
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Registration Status"
              name="status"
              fullWidth
              required
              defaultValue="Pending"
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Completed">
                Completed
              </MenuItem>

              <MenuItem value="Cancelled">
                Cancelled
              </MenuItem>
            </TextField>
          </Grid>

          {/* Notes */}
          <Grid size={12}>
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={4}
              fullWidth
              placeholder="Additional information..."
            />
          </Grid>

          {/* Submit */}
          <Grid size={12}>
            <CustomButton type="submit">
              Register Program
            </CustomButton>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}