import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useSignIn } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: Send reset code
  const handleSendCode = async (event) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await signIn.create({
        identifier: email,
      });

      await signIn.resetPasswordEmailCode.sendCode();

      setMessage(
        "Password reset code has been sent to your email."
      );

      setStep(2);
    } catch (error) {
      console.error("Send reset code error:", error);

      setErrorMessage(
        error?.message ||
          "Unable to send password reset code."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify code
  const handleVerifyCode = async (event) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      setMessage(
        "Code verified. Please enter your new password."
      );

      setStep(3);
    } catch (error) {
      console.error("Verify code error:", error);

      setErrorMessage(
        error?.message ||
          "Invalid verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset password
  const handleResetPassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });

      setMessage(
        "Password changed successfully!"
      );

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (error) {
      console.error("Reset password error:", error);

      setErrorMessage(
        error?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        px: 2,
        py: 4,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
          >
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1, mb: 3 }}
          >
            Reset your CRM Dashboard password.
          </Typography>

          {/* Error */}
          {errorMessage && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Success */}
          {message && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <Box
              component="form"
              onSubmit={handleSendCode}
            >
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !email}
                sx={{
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Sending..."
                  : "Send reset code"}
              </Button>
            </Box>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Box
              component="form"
              onSubmit={handleVerifyCode}
            >
              <TextField
                fullWidth
                label="Verification code"
                value={code}
                onChange={(event) =>
                  setCode(event.target.value)
                }
                required
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !code}
                sx={{
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Verifying..."
                  : "Verify code"}
              </Button>
            </Box>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <Box
              component="form"
              onSubmit={handleResetPassword}
            >
              <TextField
                fullWidth
                label="New password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !password}
                sx={{
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Resetting..."
                  : "Reset password"}
              </Button>
            </Box>
          )}

          {/* Back to Sign In */}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 3 }}
          >
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              Back to Sign In
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;