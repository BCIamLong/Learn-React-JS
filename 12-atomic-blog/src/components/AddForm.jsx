import { useState } from "react";
import styles from "./AddForm.module.css";
import Button from "./Button";

import PropTypes from "prop-types";

AddForm.propTypes = {
  onSetBlogs: PropTypes.func,
};

function AddForm({ onSetBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!title || !content) alert("Please enter required fields to add form!");
    onSetBlogs((blogs) => [{ title, content }, ...blogs]);
  };
  return (
    <form className={styles.form}>
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="1"
        placeholder="Post body"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <Button type="primary" onClick={handleAddBlog}>
        Add post
      </Button>
    </form>
  );
}

export default AddForm;
