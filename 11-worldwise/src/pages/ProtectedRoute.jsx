import PropTypes from "prop-types";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
  }, [isAuthenticated, navigate]);

  return isAuthenticated && children;
  // return <div>{children}</div>;
}

export default ProtectedRoute;
