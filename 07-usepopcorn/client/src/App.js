import { useState, useEffect } from "react";
import { getMovies } from "./api/movie";
import { getWatched, getWatchedStats } from "./api/watched";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Result from "./components/Result";
import SearchBox from "./components/SearchBox";
// import ListBox from "./components/ListBox";
import Box from "./components/Box";
import List from "./components/List";

function App() {
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState();
  const [stats, setStats] = useState();

  useEffect(
    () => async () => {
      const moviesData = await getMovies();
      const watchedData = await getWatched();
      const statsData = await getWatchedStats();
      // console.log(statsData);
      setMovies(moviesData);
      setWatched(watchedData);
      setStats(statsData[0]);
    },
    []
  );

  return (
    <div className="container">
      <Header query={query} onSetQuery={setQuery}>
        <SearchBox query={query} onSetQuery={setQuery} />
        <Result movies={movies} />
      </Header>
      <Main onSetMovies={setMovies} onSetWatched={setWatched}>
        <Box>
          <List type="movies" data={movies} />
        </Box>
        <Box>
          <List type="watched" data={watched} stats={stats} />
        </Box>
      </Main>
    </div>
  );
}

export default App;
