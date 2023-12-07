import { Link } from "react-router-dom";

import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";

function AppLayout() {
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
          <Sidebar />
          <Map />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
