import { useState } from "react";
import createRandomPost from "./utils/createRandomPosts";
import { PostProvider } from "./contexts/PostContext";
import Button from "./components/Button";
import { useIsFakeDark } from "./hooks/useIsFakeDark";
import { usePosts } from "./contexts/PostContext";

function App() {
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  // const [isFakeDark, setIsFakeDark] = useState(false);
  // useEffect(
  //   function () {
  //     document.documentElement.classList.toggle("fake-dark-mode");
  //   },
  //   [isFakeDark]
  // );
  const [isFakeDark, setIsFakeDark] = useIsFakeDark();
  // const context = usePosts();
  // console.log(context);

  return (
    <section>
      <Button onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}>
        {isFakeDark ? "☀️" : "🌙"}
      </Button>
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  // const { onClearPosts } = useContext(PostContext);
  const { onClearPosts } = usePosts();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results
        // posts={posts}
        />
        <SearchPosts
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  // const { searchQuery, setSearchQuery } = useContext(PostContext);
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  // const { posts } = useContext(PostContext);
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main() {
  return (
    <main>
      <FormAddPost
      //  onAddPost={onAddPost}
      />
      <Posts
      // posts={posts}
      />
    </main>
  );
}

function Posts() {
  return (
    <section>
      <List
      // posts={posts}
      />
    </section>
  );
}

function FormAddPost() {
  // const { onAddPost } = useContext(PostContext);
  const { onAddPost } = usePosts();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  // const { posts } = useContext(PostContext);
  const { posts } = usePosts();

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  // const { onAddPost } = useContext(PostContext);
  const { onAddPost } = usePosts();

  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
