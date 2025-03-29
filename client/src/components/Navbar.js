import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
     // await logout();
      localStorage.removeItem("user"); 
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
    }
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", top: 0, zIndex: 1100 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Text Editor
        </Typography>
        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar src="/profile.png" alt="Profile" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate("/settings"); handleMenuClose(); }}>
              Settings
            </MenuItem>
            <Divider /> {/* Adds a separator line */}
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
