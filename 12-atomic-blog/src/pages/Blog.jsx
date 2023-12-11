import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Header from "../components/Header";
import Main from "../components/Main";
import styles from "./Blog.module.css";
import AddForm from "../components/AddForm";
import BlogsList from "../components/BlogsList";
import BlogsItem from "../components/BlogsItem";
import SearchBox from "../components/SearchBox";
import Button from "../components/Button";
import BlogsArchive from "../components/BlogsArchive";
import Footer from "../components/Footer";

const createRandomBlogs = (length) =>
  Array.from({ length }, () => ({
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    content: faker.hacker.phrase(),
  }));

function Blog() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState(() => createRandomBlogs(30));

  // console.log(blogs);
  // find blog based on tittle, and at least 3 letters if the word include in any tittle of blogs we will return it
  const searchBlogs = blogs.filter((blg) => {
    if (query.length < 3) return false;
    if (blg.title.includes(query)) return true;
  });
  console.log(searchBlogs);
  const numBlogs = searchBlogs.length;

  useEffect(() => {
    // if (isDarkMode) document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("dark");
  }, [isDarkMode]);

  // useEffect(() => {
  //   if (!query.length) return;

  //   setBlogs(searchBlogs);
  // }, [query]);

  return (
    <div className={styles.blog}>
      <Button
        onClick={() => setIsDarkMode((isDarkMode) => !isDarkMode)}
        type="darkMode"
      >
        {!isDarkMode ? "☀" : "☪"}
      </Button>
      <Header>
        <SearchBox
          query={query}
          onSetQuery={setQuery}
          numBlogs={numBlogs}
          onSetBlogs={setBlogs}
        />
      </Header>
      <Main>
        <AddForm onSetBlogs={setBlogs} />
        <BlogsList>
          {!searchBlogs.length
            ? blogs?.map((blg, i) => <BlogsItem key={i} blog={blg} />)
            : searchBlogs.map((blg, i) => <BlogsItem key={i} blog={blg} />)}
        </BlogsList>
        <BlogsArchive
          createRandomBlogs={createRandomBlogs}
          onSetBlogs={setBlogs}
        />
      </Main>
      <Footer />
    </div>
  );
}

export default Blog;
