import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import Copyright from "../components/Copyright";
import Filter from "../components/Filter";
import Spinner from "./Spinner";
// import Cities from "../components/Cities";
// import Countries from "../components/Countries";
// import Form from "./Form";
// import CityDetail from "./CityDetail";

Sidebar.propTypes = {
  isLoading: PropTypes.bool,
};

function Sidebar({ isLoading }) {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <Filter />
      {isLoading ? <Spinner /> : <Outlet />}

      {/* <CityDetail /> */}
      {/* <Countries /> */}
      {/* <Cities /> */}
      {/* <Form /> */}
      <Copyright />
    </div>
  );
}

export default Sidebar;
