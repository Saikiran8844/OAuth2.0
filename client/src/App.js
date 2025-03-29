

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EditorPage from "./pages/EditorPage";
import PrivateRoute from "./components/PrivateRoute";
import MyDocs from "./pages/MyDocs";
import MyDrafts from "./pages/MyDrafts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
        <Route path="/my-drafts" element={<PrivateRoute><MyDrafts /></PrivateRoute>} /> 
        <Route path="/editor/:id/:type" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
        <Route path="/my-docs" element={<PrivateRoute><MyDocs /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
