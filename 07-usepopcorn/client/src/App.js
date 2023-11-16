import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Result from "./components/Result";
import SearchBox from "./components/SearchBox";
import ListBox from "./components/ListBox";
import List from "./components/List";

function App() {
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState("");

  return (
    <div className="container">
      <Header query={query} onSetQuery={setQuery}>
        <SearchBox query={query} onSetQuery={setQuery} />
        <Result movies={movies} />
      </Header>
      <Main onSetMovies={setMovies}>
        <ListBox>
          <List type="movies" data={movies} />
        </ListBox>
      </Main>
    </div>
  );
}

export default App;
