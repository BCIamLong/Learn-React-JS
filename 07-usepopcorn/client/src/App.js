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
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState();
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // (async () => {
  //   const moviesData = await getMovies();
  //   setMovies(moviesData);
  // })();

  useEffect(
    () => async () => {
      // const moviesData = await getMovies();
      const watchedData = await getWatched();
      const statsData = await getWatchedStats();
      // console.log(statsData);
      // setMovies(moviesData);
      setWatched(watchedData);
      setStats(statsData[0]);
    },
    []
  );

  async function handleQuery(q) {
    setError("");
    setQuery(q);
    setIsLoading(true);
    if (!q) {
      setIsLoading(false);
      return setMovies([]);
    }
    try {
      const movies = await getMovies(q);
      if (movies.length === 0) throw new Error("No movies data found!");

      setMovies(movies);
    } catch (err) {
      // console.log(err.message);
      // setIsLoading(false);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <Header query={query}>
        <SearchBox query={query} onSetQuery={handleQuery} />
        <Result movies={movies} />
      </Header>
      <Main onSetMovies={setMovies} onSetWatched={setWatched}>
        {/* <Box element={<List type="movies" data={movies} />} /> */}
        <Box>
          {error && <ErrorMessage error={error} />}
          {isLoading ? (
            <Loader />
          ) : error ? null : (
            <List type="movies" data={movies} />
          )}
        </Box>
        {/* <Box element={<List type="watched" data={watched} stats={stats} />} /> */}
        <Box>
          <List type="watched" data={watched} stats={stats} />
        </Box>
      </Main>
    </div>
  );
}

export default App;
