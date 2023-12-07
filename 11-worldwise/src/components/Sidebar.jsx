import styles from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import Cities from "../components/Cities";
import Copyright from "../components/Copyright";
import Countries from "../components/Countries";
import Filter from "../components/Filter";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <Filter />
      <Countries />
      {/* <Cities /> */}
      <Copyright />
    </div>
  );
}

export default Sidebar;
