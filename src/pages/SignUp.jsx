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

function SignUpPage() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = fetchStatus === "fetching";

  // -----------------------------
  // STEP 1: CREATE ACCOUNT
  // -----------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Unable to create your account."
      );

      return;
    }

    // Send verification code
    const verificationResult =
      await signUp.verifications.sendEmailCode();

    if (verificationResult.error) {
      setErrorMessage(
        verificationResult.error.message ||
          "Unable to send verification code."
      );

      return;
    }

    setVerificationStep(true);
  };

  // -----------------------------
  // STEP 2: VERIFY EMAIL
  // -----------------------------
  const handleVerify = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    const { error } =
      await signUp.verifications.verifyEmailCode({
        code,
      });

    if (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Invalid verification code."
      );

      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            navigate("/", { replace: true });
          }
        },
      });
    }
  };

  // -----------------------------
  // GOOGLE SIGN UP
  // -----------------------------
  const handleGoogleSignUp = async () => {
    setErrorMessage("");

    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/signup/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  // -----------------------------
  // VERIFICATION SCREEN
  // -----------------------------
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
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box textAlign="center" mb={4}>
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
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMessage}
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
                required
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !code}
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
              onClick={async () => {
                const { error } =
                  await signUp.verifications.sendEmailCode();

                if (error) {
                  setErrorMessage(error.message);
                } else {
                  setErrorMessage("");
                }
              }}
              sx={{
                mt: 2,
                textTransform: "none",
              }}
            >
              Resend verification code
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // -----------------------------
  // SIGN UP SCREEN
  // -----------------------------
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
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* BRAND */}
          <Box textAlign="center" mb={4}>
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
            <Alert severity="error" sx={{ mb: 3 }}>
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
              color: '#fff'
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

          {/* FORM */}
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
                showPassword ? "text" : "password"
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
                            (value) => !value
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

export default SignUpPage;