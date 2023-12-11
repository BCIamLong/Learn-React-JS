import Button from "./Button";
import styles from "./SearchBox.module.css";
import PropTypes from "prop-types";

SearchBox.propTypes = {
  query: PropTypes.string,
  onSetQuery: PropTypes.func,
  numBlogs: PropTypes.number,
  onSetBlogs: PropTypes.func,
};

function SearchBox({ query, onSetQuery, numBlogs, onSetBlogs }) {
  return (
    <div className={styles.search}>
      <p>
        <span>🚀</span>
        {numBlogs} atomic posts found
      </p>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
      />
      <Button type="primary" onClick={() => onSetBlogs([])}>
        Clear posts
      </Button>
    </div>
  );
}

export default SearchBox;
