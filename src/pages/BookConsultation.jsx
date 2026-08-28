import {
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomButton from "../common/Button";

const API_URL = "http://localhost:5000";

export default function BookConsultation() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    consultationType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/consultations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to book consultation"
        );
      }

      alert("Consultation booked successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        consultationType: "",
        message: "",
      });

      // Optional: return to previous page
      // navigate(-1);

    } catch (error) {
      console.error("Booking error:", error);

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
  sx={(theme) => ({
    flexGrow: 1,
    p: 4,
    backgroundColor:
      theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default,
  })}
>
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 3 }}
        >
          Book Consultation
        </Typography>

        <Grid container spacing={2}>
          {/* NAME */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>

          {/* EMAIL */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>

          {/* PHONE */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>

          {/* DATE */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Consultation Date"
              name="date"
              type="date"
              value={formData.date}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>

          {/* TIME */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Time Slot"
              name="time"
              value={formData.time}
              fullWidth
              required
              onChange={handleChange}
            >
              <MenuItem value="10am">
                10:00 AM
              </MenuItem>

              <MenuItem value="12pm">
                12:00 PM
              </MenuItem>

              <MenuItem value="3pm">
                3:00 PM
              </MenuItem>

              <MenuItem value="5pm">
                5:00 PM
              </MenuItem>
            </TextField>
          </Grid>

          {/* CONSULTATION TYPE */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Consultation Type"
              name="consultationType"
              value={formData.consultationType}
              fullWidth
              required
              onChange={handleChange}
            >
              <MenuItem value="online">
                Online
              </MenuItem>

              <MenuItem value="offline">
                Offline
              </MenuItem>
            </TextField>
          </Grid>

          {/* MESSAGE */}
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              multiline
              rows={4}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>

          {/* BUTTON */}
          <Grid size={{ xs: 12 }}>
            <CustomButton
              type="submit"
              disabled={isSubmitting}
              sx={{ mt: 1 }}
            >
              {isSubmitting
                ? "Booking..."
                : "Book Consultation"}
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}