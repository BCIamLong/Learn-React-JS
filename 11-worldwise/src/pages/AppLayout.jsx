import { Link } from "react-router-dom";

import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";

AppLayout.propTypes = {
  isLoading: PropTypes.bool,
};

function AppLayout({ isLoading }) {
  return (
    <div className="container">
      <div className={styles.account}>
        <img
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <p>Welcome, Jack</p>
        <Link to="/login">Logout</Link>
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
