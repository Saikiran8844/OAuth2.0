import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Divider, Box } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 250, 
        minHeight: "100vh",
        p: 3,
        backgroundColor: "#f8f9fa", 
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)", 
        display: "flex",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/editor")}>
            New
          </Button>
          <Button variant="outlined" color="success" fullWidth onClick={() => navigate("/my-drafts")}>
            My Drafts
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/my-docs")}>
            My Docs
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
