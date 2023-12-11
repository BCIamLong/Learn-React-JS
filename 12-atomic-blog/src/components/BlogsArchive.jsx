import { useState } from "react";
import styles from "./BlogsArchive.module.css";
import Button from "./Button";
import PropTypes from "prop-types";

BlogsArchive.propTypes = {
  createRandomBlogs: PropTypes.func,
  onSetBlogs: PropTypes.func,
};

function BlogsArchive({ createRandomBlogs, onSetBlogs }) {
  const [blogsArchive, setBlogsArchive] = useState(() =>
    createRandomBlogs(100)
  );

  const [isShowArchive, setIsShowArchive] = useState(false);

  const handleAddBlogToArchive = (blog) => {
    setBlogsArchive((blogsArchive) =>
      blogsArchive.filter((blg) => blg.title !== blog.title)
    );
    onSetBlogs((blogs) => [blog, ...blogs]);
  };

  return (
    <div className={styles.blogsArchive}>
      <h3>POST ARCHIVE</h3>
      <Button
        type="primary"
        onClick={() => setIsShowArchive((isShowArchive) => !isShowArchive)}
      >
        {!isShowArchive ? "Show archive posts" : "Hide archive posts"}
      </Button>
      {isShowArchive && (
        <ul className={styles.archiveList}>
          {blogsArchive?.map((blg, i) => (
            <li key={i}>
              <p>
                <strong>{blg.title}:</strong> {blg.content}
              </p>
              <Button
                type="primary"
                onClick={() => handleAddBlogToArchive(blg)}
              >
                Add as new post
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlogsArchive;
