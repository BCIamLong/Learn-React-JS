import PropTypes from "prop-types";
import styles from "./Button.module.css";

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

function Button({ type, onClick, children }) {
  return (
    <button
      // className={`${styles.btn}${type ? ` btn--${type}` : ""}`}
      className={`${styles.btn}${type ? ` ${styles[type]}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
