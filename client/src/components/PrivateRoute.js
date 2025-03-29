import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    console.log("Token from URL:", tokenFromUrl);

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/editor"); // Remove token from URL
    }
  const token = localStorage.getItem("token");
  console.log("Checking token in PrivateRoute: ");

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
