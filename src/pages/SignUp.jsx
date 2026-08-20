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

    if (!email || !password) {
      setErrorMessage(
        "Please enter your email address and password."
      );
      return;
    }

    try {
      // Create the Clerk signup
      const { error } = await signUp.password({
        emailAddress: email.trim(),
        password,
      });

      if (error) {
        console.error("Signup error:", error);

        setErrorMessage(
          error.message ||
            "Unable to create your account."
        );

        return;
      }

      // ==========================================
      // SEND EMAIL VERIFICATION CODE
      // ==========================================
      const {
        error: verificationError,
      } = await signUp.verifications.sendEmailCode();

      if (verificationError) {
        console.error(
          "Verification email error:",
          verificationError
        );

        setErrorMessage(
          verificationError.message ||
            "Unable to send verification code."
        );

        return;
      }

      // ==========================================
      // SHOW VERIFICATION SCREEN
      // ==========================================
      setVerificationStep(true);

      setSuccessMessage(
        `Verification code sent to ${email}`
      );
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

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

    if (!code) {
      setErrorMessage(
        "Please enter the verification code."
      );
      return;
    }

    try {
      const {
        error: verificationError,
      } = await signUp.verifications.verifyEmailCode({
        code: code.trim(),
      });

      if (verificationError) {
        console.error(
          "Verification error:",
          verificationError
        );

        setErrorMessage(
          verificationError.message ||
            "Invalid verification code."
        );

        return;
      }

      console.log(
        "Email verification successful."
      );

      console.log(
        "Current signup status:",
        signUp.status
      );

      // ==========================================
      // COMPLETE SIGNUP
      // ==========================================
      if (signUp.status === "complete") {
        const {
          error: finalizeError,
        } = await signUp.finalize({
          navigate: ({
            session,
            decorateUrl,
          }) => {
            // Handle any Clerk task
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

        if (finalizeError) {
          console.error(
            "Finalize error:",
            finalizeError
          );

          setErrorMessage(
            finalizeError.message ||
              "Unable to complete your account setup."
          );

          return;
        }

        return;
      }

      // ==========================================
      // VERIFIED BUT SIGNUP NOT COMPLETE
      // ==========================================
      setSuccessMessage(
        "Email verified successfully. Completing your account..."
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
  // RESEND VERIFICATION CODE
  // ==========================================
  const handleResendCode = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const {
        error: resendError,
      } = await signUp.verifications.sendEmailCode();

      if (resendError) {
        console.error(
          "Resend verification error:",
          resendError
        );

        setErrorMessage(
          resendError.message ||
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
    setSuccessMessage("");

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
  // BACK TO SIGN UP
  // ==========================================
  const handleBackToSignup = () => {
    setVerificationStep(false);
    setCode("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  // ==========================================
  // VERIFICATION SCREEN
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
            {/* HEADER */}
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
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {email}
              </Typography>
            </Box>

            {/* ERROR */}
            {errorMessage && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
              >
                {errorMessage}
              </Alert>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
              >
                {successMessage}
              </Alert>
            )}

            {/* VERIFICATION FORM */}
            <Box
              component="form"
              onSubmit={handleVerify}
            >
              <TextField
                fullWidth
                label="Verification code"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(event) => {
                  const value =
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                  setCode(value);
                }}
                autoComplete="one-time-code"
                inputProps={{
                  inputMode: "numeric",
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
                  code.length !== 6
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

            {/* RESEND */}
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

            {/* BACK */}
            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={handleBackToSignup}
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
  // SIGN UP SCREEN
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

          {/* ERROR */}
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
              borderColor: "black",
              "&:hover": {
                backgroundColor: "#222",
                borderColor: "#222",
              },
            }}
          >
            Continue with Google
          </Button>

          {/* DIVIDER */}
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
            {/* EMAIL */}
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

            {/* PASSWORD */}
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
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (value) => !value
                          )
                        }
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
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

            {/* CREATE ACCOUNT */}
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