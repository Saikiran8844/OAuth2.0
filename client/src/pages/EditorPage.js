import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EditorPage = () => {
  const { id, type } = useParams(); 
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(!!id); 

  useEffect(() => {
    if (!id) return; 

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please log in.");
        return navigate("/");
      }

      const url = type === "draft"
        ? `${process.env.REACT_APP_SERVER_URL}/drafts/${id}`
        : `${process.env.REACT_APP_SERVER_URL}/drive/fetch/${id}`;
      console.log( "url"+ url);
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <Editor content={content} setContent={setContent} id={id} type={type} />
        )}
      </div>
    </div>
  );
};

export default EditorPage;
