import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomButton from "../common/Button";

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Consultation booked successfully!");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, background: "#f6f9fc" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Book Consultation
        </Typography>

        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Consultation Date"
              name="date"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              select
              label="Time Slot"
              name="time"
              fullWidth
              required
              onChange={handleChange}
            >
              <MenuItem value="10am">10:00 AM</MenuItem>
              <MenuItem value="12pm">12:00 PM</MenuItem>
              <MenuItem value="3pm">3:00 PM</MenuItem>
              <MenuItem value="5pm">5:00 PM</MenuItem>
            </TextField>
          </Grid>
          <Grid size={4}>
            <TextField
              select
              label="Consultation Type"
              name="consultationType"
              fullWidth
              required
              value={formData.consultationType}
              onChange={handleChange}
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
            </TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomButton type="submit" sx={{ mt: 1 }}>
              Book Consultation
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
