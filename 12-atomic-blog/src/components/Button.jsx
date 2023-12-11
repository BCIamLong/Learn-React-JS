import PropTypes from "prop-types";
import styles from "./Button.module.css";

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

function Button({ type, onClick, children }) {
  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
