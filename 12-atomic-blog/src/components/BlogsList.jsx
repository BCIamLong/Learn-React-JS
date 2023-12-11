import PropTypes from "prop-types";
import styles from "./BlogsList.module.css";

BlogsList.propTypes = {
  children: PropTypes.any,
};

function BlogsList({ children }) {
  return (
    <div className={styles.blogsList}>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

export default BlogsList;
