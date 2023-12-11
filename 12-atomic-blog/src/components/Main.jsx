import styles from "./Main.module.css";
import PropTypes from "prop-types";

Main.propTypes = {
  children: PropTypes.any,
};

function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}

export default Main;
