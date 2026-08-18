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
import { useSignIn } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = fetchStatus === "fetching";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(error);

      setErrorMessage(
        error.message || "Invalid email or password."
      );

      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log("Session task:", session.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            navigate("/");
          }
        },
      });

      return;
    }

    if (signIn.status === "needs_second_factor") {
      setErrorMessage(
        "Your account requires additional verification."
      );

      return;
    }

    if (signIn.status === "needs_client_trust") {
      const emailCodeFactor =
        signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();

        setErrorMessage(
          "A verification code has been sent to your email."
        );
      }

      return;
    }

    console.log("Sign-in status:", signIn.status);
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/signin/sso-callback",
      redirectUrlComplete: "/",
    });
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
          border: "1px solid",
          borderColor: "#e0e0e0",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
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
          {/* Brand */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
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
              Welcome back! Please sign in to continue.
            </Typography>
          </Box>

          {/* Error */}
          {errorMessage && (
            <Alert
              severity={
                errorMessage.includes("verification")
                  ? "info"
                  : "error"
              }
              sx={{ mb: 3 }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Google */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 15,
              fontWeight: 500,
              
            }}
          >
            Continue with Google
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              OR
            </Typography>
          </Divider>

          {/* Form */}
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
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword((value) => !value)
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

            {/* Forgot password */}
            <Box
              sx={{
                textAlign: "right",
                mt: 1,
              }}
            >
              <Typography
                component={Link}
                to="/forgot-password"
                variant="body2"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            {/* Submit */}
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
                fontWeight: 600
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>

          {/* Sign up */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Don't have an account?{" "}
            <Box
              component={Link}
              to="/signup"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create account
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignInPage;