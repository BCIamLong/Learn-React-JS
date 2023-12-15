import { useNavigate } from "react-router-dom";

import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

AppLayout.propTypes = {
  isLoading: PropTypes.bool,
};

// function AppLayout({ isLoading }) {
function AppLayout() {
  const { isLoading } = useCities();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, []);

  return (
    <div className="container">
      <div className={styles.account}>
        <img src={user.photo} alt="" />
        <p>Welcome, {user.name?.split(" ")[0]}</p>
        <button className={styles.logout} onClick={handleClick}>
          Logout
        </button>
        {/* <Link to="/login">Logout</Link> */}
      </div>
      <div className={styles.app}>
        <main className={styles.main}>
          <Sidebar isLoading={isLoading} />
          <Map />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
