import React, { useEffect, useState } from "react";
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

import { useSignIn, useAuth } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [verificationStep, setVerificationStep] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const loading = fetchStatus === "fetching";

  // ==========================================
  // REDIRECT IF ALREADY SIGNED IN
  // ==========================================

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  // ==========================================
  // SHOW CLERK ERRORS
  // ==========================================

  useEffect(() => {
    if (errors?.global?.[0]?.message) {
      setErrorMessage(errors.global[0].message);
    }
  }, [errors]);

  // ==========================================
  // FINISH SIGN IN
  // ==========================================

  const finishSignIn = async () => {
    try {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          // Handle pending session tasks
          if (session?.currentTask) {
            console.log(
              "Session task:",
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
    } catch (error) {
      console.error(
        "Finalize error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to complete sign in."
      );
    }
  };

  // ==========================================
  // SIGN IN
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      navigate("/", {
        replace: true,
      });

      return;
    }

    try {
      // Current Clerk API
      const { error } =
        await signIn.password({
          emailAddress: email,
          password: password,
        });

      console.log(
        "Sign-in error:",
        error
      );

      console.log(
        "Sign-in status:",
        signIn.status
      );

      // ======================================
      // CLERK ERROR
      // ======================================

      if (error) {
        setErrorMessage(
          error.message ||
            "Unable to sign in."
        );

        return;
      }

      // ======================================
      // LOGIN COMPLETE
      // ======================================

      if (
        signIn.status === "complete"
      ) {
        await finishSignIn();

        return;
      }

      // ======================================
      // DEVICE TRUST
      // ======================================

      if (
        signIn.status ===
        "needs_client_trust"
      ) {
        console.log(
          "Device Trust required"
        );

        const emailCodeFactor =
          signIn.supportedSecondFactors?.find(
            (factor) =>
              factor.strategy ===
              "email_code"
          );

        console.log(
          "Email code factor:",
          emailCodeFactor
        );

        if (!emailCodeFactor) {
          setErrorMessage(
            "Additional verification is required, but no email verification method is available."
          );

          return;
        }

        await signIn.mfa.sendEmailCode();

        setVerificationStep(true);

        setSuccessMessage(
          `A verification code was sent to ${email}`
        );

        return;
      }

      // ======================================
      // SECOND FACTOR / MFA
      // ======================================

      if (
        signIn.status ===
        "needs_second_factor"
      ) {
        const emailFactor =
          signIn.supportedSecondFactors?.find(
            (factor) =>
              factor.strategy ===
              "email_code"
          );

        if (!emailFactor) {
          setErrorMessage(
            "Additional verification is required. Please use the verification method configured for your account."
          );

          return;
        }

        await signIn.mfa.sendEmailCode();

        setVerificationStep(true);

        setSuccessMessage(
          `A verification code was sent to ${email}`
        );

        return;
      }

      // ======================================
      // UNKNOWN STATUS
      // ======================================

      console.error(
        "Sign-in attempt not complete:",
        signIn
      );

      setErrorMessage(
        "Unable to complete sign in. Please try again."
      );
    } catch (error) {
      console.error(
        "Sign in error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to sign in."
      );
    }
  };

  // ==========================================
  // VERIFY EMAIL CODE
  // ==========================================

  const handleVerify = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!code.trim()) {
      setErrorMessage(
        "Please enter the verification code."
      );

      return;
    }

    try {
      const { error } =
        await signIn.mfa.verifyEmailCode({
          code: code.trim(),
        });

      console.log(
        "Verification error:",
        error
      );

      console.log(
        "Verification status:",
        signIn.status
      );

      // ======================================
      // VERIFICATION ERROR
      // ======================================

      if (error) {
        setErrorMessage(
          error.message ||
            "Invalid verification code."
        );

        return;
      }

      // ======================================
      // VERIFICATION COMPLETE
      // ======================================

      if (
        signIn.status === "complete"
      ) {
        await finishSignIn();

        return;
      }

      setErrorMessage(
        "Verification was not completed. Please try again."
      );
    } catch (error) {
      console.error(
        "Verification error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Invalid verification code."
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
      await signIn.mfa.sendEmailCode();

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
  // GOOGLE SIGN IN
  // ==========================================

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl:
          "/signin/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error(
        "Google sign in error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Unable to continue with Google."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          Loading...
        </Typography>
      </Box>
    );
  }

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
                Verify Your Login
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                We sent a verification
                code to
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
                severity="info"
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
                  setCode(
                    event.target.value
                  )
                }
                autoComplete="one-time-code"
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
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
                  textTransform:
                    "none",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Verifying..."
                  : "Verify code"}
              </Button>
            </Box>

            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={
                handleResendCode
              }
              sx={{
                mt: 2,
                textTransform:
                  "none",
              }}
            >
              Resend verification
              code
            </Button>

            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={() => {
                setVerificationStep(
                  false
                );

                setCode("");

                setErrorMessage("");

                setSuccessMessage("");
              }}
              sx={{
                textTransform:
                  "none",
              }}
            >
              Back to sign in
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // ==========================================
  // NORMAL SIGN IN PAGE
  // ==========================================

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
              Welcome back! Please sign
              in to continue.
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
            onClick={
              handleGoogleSignIn
            }
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: 2,
              textTransform:
                "none",
              fontSize: 15,
              fontWeight: 500,
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

          {/* FORM */}

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
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              required
              sx={{ mb: 2 }}
            />

            {/* PASSWORD */}

            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="current-password"
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

            {/* FORGOT PASSWORD */}

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
                  color:
                    "primary.main",
                  textDecoration:
                    "none",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            {/* SUBMIT */}

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
                textTransform:
                  "none",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </Button>
          </Box>

          {/* SIGN UP */}

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
                color:
                  "primary.main",
                fontWeight: 600,
                textDecoration:
                  "none",
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

export default SignIn;