import PropTypes from "prop-types";
import styles from "./Form.module.css";

Form.propTypes = {
  children: PropTypes.any,
};

function Form({ children }) {
  return <form className={styles.form}>{children}</form>;
}

export default Form;
