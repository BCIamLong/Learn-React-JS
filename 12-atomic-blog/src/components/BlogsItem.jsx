import styles from "./BlogsItem.module.css";
import PropTypes from "prop-types";

BlogsItem.propTypes = {
  blog: PropTypes.object,
};

function BlogsItem({ blog }) {
  const { title, content } = blog;
  return (
    <li className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
    </li>
  );
}

export default BlogsItem;
