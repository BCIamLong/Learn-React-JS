import styles from "./Message.module.css";
import PropTypes from "prop-types";

Message.propTypes = {
  message: PropTypes.string,
};

function Message({ message }) {
  return (
    <div className={styles.message}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
