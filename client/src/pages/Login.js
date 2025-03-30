import React, { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); 

  console.log("Server URL:", process.env.REACT_APP_SERVER_URL);

  const handleGoogleLogin = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #141E30, #243B55)", // Fancy background
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 400 },
          maxWidth: 400,
          backgroundColor: "#fff",
          borderRadius: 3,
          p: 3,
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        {/* Title and Toggle */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </Typography>
        <Typography variant="body2">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              color: "#4CAF50",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </span>
        </Typography>

        {/* Google Login Button */}
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            mt: 2,
            textTransform: "none",
            backgroundColor: "#4285F4",
            "&:hover": { backgroundColor: "#357AE8" },
          }}
        >
          {isSignUp ? "Sign up with Google" : "Sign in with Google"}
        </Button>

        <Divider sx={{ my: 2, color: "#666" }}>OR</Divider>

        {/* Sign-Up Extra Fields */}
        {isSignUp && (
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
        )}

        {/* Email & Password Fields */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 1 }}
        />

        {/* Forgot Password (Only in Login) */}
        {!isSignUp && (
          <Typography align="right">
            <Link
              to="/forgot-password"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "#007BFF",
              }}
            >
              Forgot password?
            </Link>
          </Typography>
        )}

        {/* Sign Up / Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            textTransform: "none",
            mt: 2,
            "&:hover": { backgroundColor: "#388E3C" },
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
