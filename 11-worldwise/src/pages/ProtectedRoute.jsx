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

  // * navigate is an effect and we should call it in the useEffect hook like this
  // * effect is something it doesn't relate to render the react component itself, don't relate to the react app and it's beyond these scopes then it's effects
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
  }, [isAuthenticated, navigate]);

  return isAuthenticated && children;
  // return <div>{children}</div>;
}

export default ProtectedRoute;
