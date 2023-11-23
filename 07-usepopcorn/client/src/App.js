import { useState, useEffect } from "react";
import { getMovieDetail, getMovies } from "./api/movie";
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
import Detail from "./components/Detail";
import Item from "./components/Item";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState();
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieRating, setMovieRating] = useState(0);

  // (async () => {
  //   const moviesData = await getMovies();
  //   setMovies(moviesData);
  // })();
  // useEffect(() => console.log("C"));
  // useEffect(() => console.log("B"), []);
  // console.log("A");

  useEffect(
    () => async () => {
      // const moviesData = await getMovies();
      const watchedData = await getWatched();
      const statsData = await getWatchedStats();
      // console.log(selectedId);
      // if (selectedId) {
      //   const selectedMovie = await getMovieDetail(selectedId);
      //   // console.log(statsData);
      //   // setMovies(moviesData);
      //   setSelectedMovie(selectedMovie);
      // }
      setWatched(watchedData);
      setStats(statsData[0]);
    },
    []
  );

  async function handleItemClick(id) {
    if (!id) return;
    if (id === selectedMovie?._id) return setSelectedMovie(null);
    const movie = await getMovieDetail(id);
    setSelectedMovie(movie);
    // const movie = await getMovieDetail(id);
    // setSelectedMovie((selectedMovie) => {
    //   return movie;
    // });
  }
  async function handleQuery(q) {
    setError("");
    setQuery(q);
    setIsLoading(true);
    if (!q || q.length < 3) {
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
            <List>
              {movies?.map((mv) => (
                <Item
                  type="movies"
                  item={mv}
                  key={mv._id}
                  onItemClick={handleItemClick}
                />
              ))}
            </List>
          )}
        </Box>
        {/* <Box element={<List type="watched" data={watched} stats={stats} />} /> */}
        <Box>
          {selectedMovie ? (
            <Detail
              item={selectedMovie}
              onCloseDetail={setSelectedMovie}
              onSetRating={setMovieRating}
              rating={movieRating}
            />
          ) : (
            <List stats={stats} type="watched">
              {watched?.map((wc) => (
                <Item item={wc} key={wc._id} />
              ))}
            </List>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
