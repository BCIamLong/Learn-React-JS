import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState("");

  return (
    <div className="container">
      <Header query={query} onSetQuery={setQuery} movies={movies} />
      <Main movies={movies} onSetMovies={setMovies} />
    </div>
  );
}

export default App;
