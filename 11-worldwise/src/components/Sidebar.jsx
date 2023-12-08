import styles from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import Copyright from "../components/Copyright";
import Filter from "../components/Filter";
// import Cities from "../components/Cities";
// import Countries from "../components/Countries";
// import Spinner from "./Spinner";
// import Form from "./Form";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <Filter />
      <Outlet />
      {/* <Countries /> */}
      {/* <Cities /> */}
      {/* <Form /> */}
      {/* <Spinner /> */}
      <Copyright />
    </div>
  );
}

export default Sidebar;
