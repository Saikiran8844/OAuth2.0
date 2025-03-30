import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Box, CircularProgress, Avatar} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const MyDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token found! Please log in.");
      const SERVER_URL = process.env.REACT_APP_SERVER_URL;
      try {
        const response = await axios.get( SERVER_URL+'/drafts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrafts(response.data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDrafts();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Box sx={{ padding: 10 }}>
          <Typography variant="h4" gutterBottom>
            My Drafts
          </Typography>

          {/* Show Loader While Fetching Data */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress />
            </Box>
          ) : (
            drafts.length > 0 ? (
              drafts.map((draft) => (
                <Card
                  key={draft.id}
                  sx={{ marginBottom: 2, cursor: "pointer" }}
                  onClick={() => navigate(`/editor/${draft.id}/draft`)}
                >
                  <CardContent  sx={{display:"flex"}}>
                  <Avatar sx={{ bgcolor: "#2196F3", marginRight: 2 }}>
                  <DescriptionIcon />
                </Avatar>
                    <Typography variant="h6" padding={{paddingTop:5}}>{draft.title || "Untitled Draft"}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No drafts found.</Typography>
            )
          )}
        </Box>
      </div>
    </div>
  );
};

export default MyDrafts;
