import { Box, Typography, TextField, MenuItem, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import CustomButton from "../common/Button";
import { useState } from "react";

export default function TaskEmployee() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSuccess(true);
    reset(); // clear all fields
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Form submitted successfully!
        </Alert>
      )}

      <Box
        sx={{
          background: "#f3f8fc",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ py: 1 }}>
          Task Manager
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1, py: 4 }}>
            <Grid container spacing={2}>
              <Grid size={4}>
                <TextField
                  label="Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Subject"
                  {...register("subject", { required: "Subject is required" })}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  select
                  label="Country"
                  {...register("country", { required: "Country is required" })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  fullWidth
                >
                  <MenuItem value="pakistan">Pakistan</MenuItem>
                  <MenuItem value="uae">UAE</MenuItem>
                  <MenuItem value="usa">USA</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <CustomButton sx={{ mt: 3 }} type="submit">
              Submit
            </CustomButton>
          </Box>
        </form>
      </Box>
    </>
  );
}
