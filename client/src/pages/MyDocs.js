import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Box, CircularProgress, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyDocs = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocs = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token found! Please log in.");

      try {
        console.log("env"+ process.env.REACT_APP_SERVER_URL);
        const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/drive", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocs(response.data.files || []);
      } catch (error) {
        console.error("Error fetching docs:", error);
      } finally {
        setLoading(false); // Stop loader after fetching
      }
    };

    fetchDocs();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Box sx={{ padding: 3, margin: 5 }}>
          <Typography variant="h4" gutterBottom>
            My Documents
          </Typography>

          {/* Show Loader While Fetching Data */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress />
            </Box>
          ) : docs.length > 0 ? (
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, padding: 2 }}>
              {docs.map((doc) => (
                <Card
                  key={doc.id}
                  sx={{
                    display: "flex",
                    padding: 1,
                    cursor: "pointer",
                    borderRadius: 1,
                    minWidth: "250px",
                    height: "40px",
                    border: "1px solid #ddd",
                  }}
                  onClick={() => navigate(`/editor/${doc.id}/doc`)}
                >
                  <Avatar sx={{ bgcolor: "#2196F3", marginRight: 2 }}>
                    <DescriptionIcon />
                  </Avatar>
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", padding: 0, marginTop: "4px" }}>
                      {doc.name || "Untitled Document"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>No documents found.</Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default MyDocs;
