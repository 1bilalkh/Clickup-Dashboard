import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useSignUp } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { signUp, fetchStatus } = useSignUp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loading = fetchStatus === "fetching";

  // ==========================================
  // CREATE ACCOUNT
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await signUp.password({
        emailAddress: email,
        password,
      });

      if (result.error) {
        setErrorMessage(
          result.error.message || "Unable to create your account."
        );
        return;
      }

      // Send email verification code
      const verification =
        await signUp.verifications.sendEmailCode();

      if (verification.error) {
        setErrorMessage(
          verification.error.message ||
            "Unable to send verification code."
        );
        return;
      }

      // IMPORTANT:
      // Show verification page after code is sent
      setVerificationStep(true);
      setSuccessMessage(
        `Verification code sent to ${email}`
      );
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        error?.message ||
          "Something went wrong while creating your account."
      );
    }
  };

  // ==========================================
  // VERIFY EMAIL
  // ==========================================
  const handleVerify = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result =
        await signUp.verifications.verifyEmailCode({
          code,
        });

      if (result.error) {
        setErrorMessage(
          result.error.message ||
            "Invalid verification code."
        );
        return;
      }

      console.log(
        "Verification successful:",
        result.status
      );

      // Check Clerk signup status
      if (result.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(
                "Current session task:",
                session.currentTask
              );
              return;
            }

            const url = decorateUrl("/");

            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              navigate("/", {
                replace: true,
              });
            }
          },
        });

        return;
      }

      setSuccessMessage(
        "Email verified successfully."
      );
    } catch (error) {
      console.error(
        "Verification error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to verify the email."
      );
    }
  };

  // ==========================================
  // RESEND CODE
  // ==========================================
  const handleResendCode = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result =
        await signUp.verifications.sendEmailCode();

      if (result.error) {
        setErrorMessage(
          result.error.message ||
            "Unable to resend verification code."
        );
        return;
      }

      setSuccessMessage(
        `A new verification code was sent to ${email}`
      );
    } catch (error) {
      console.error(
        "Resend code error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to resend verification code."
      );
    }
  };

  // ==========================================
  // GOOGLE SIGN UP
  // ==========================================
  const handleGoogleSignUp = async () => {
    setErrorMessage("");

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/signup/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error(
        "Google signup error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to continue with Google."
      );
    }
  };

  // ==========================================
  // VERIFICATION PAGE
  // ==========================================
  if (verificationStep) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fb",
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
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              "0 10px 35px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Box
              textAlign="center"
              mb={4}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
              >
                Verify Email
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                We sent a verification code to
              </Typography>

              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mt: 0.5 }}
              >
                {email}
              </Typography>
            </Box>

            {errorMessage && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
              >
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
              >
                {successMessage}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleVerify}
            >
              <TextField
                fullWidth
                label="Verification code"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(event) =>
                  setCode(event.target.value)
                }
                autoComplete="one-time-code"
                inputProps={{
                  maxLength: 6,
                }}
                required
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  loading ||
                  code.length === 0
                }
                sx={{
                  mt: 3,
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Verifying..."
                  : "Verify email"}
              </Button>
            </Box>

            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={handleResendCode}
              sx={{
                mt: 2,
                textTransform: "none",
              }}
            >
              Resend verification code
            </Button>

            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={() => {
                setVerificationStep(false);
                setCode("");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              sx={{
                textTransform: "none",
              }}
            >
              Back to sign up
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // ==========================================
  // SIGN UP PAGE
  // ==========================================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fb",
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
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          {/* BRAND */}
          <Box
            textAlign="center"
            mb={4}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
            >
              CRM Dashboard
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Create your account to get started
            </Typography>
          </Box>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* GOOGLE */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Google />}
            onClick={handleGoogleSignUp}
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 15,
              fontWeight: 500,
              backgroundColor: "black",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              OR
            </Typography>
          </Divider>

          {/* SIGN UP FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Email address"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="Create a password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="new-password"
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            (value) =>
                              !value
                          )
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              className="grd-btn"
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={
                loading ||
                !email ||
                !password
              }
              sx={{
                mt: 3,
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </Button>
          </Box>

          {/* SIGN IN */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Already have an account?{" "}
            <Box
              component={Link}
              to="/signin"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUp;