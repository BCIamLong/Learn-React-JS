import { useState, useEffect, useRef } from "react";
import { getMovies } from "./api/movie";
import {
  createWatched,
  deleteWatched,
  getWatched,
  // getWatchedDetail,
  getWatchedStats,
} from "./api/watched";
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
import Detail from "./components/Detail-useEffect";
import Item from "./components/Item";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [query, setQuery] = useState("");
  const [stats, setStats] = useState();
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movieRating, setMovieRating] = useState(0);
  // const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const watchedData = localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : [];
    return watchedData;
  });
  const count = useRef(0);

  const { movies, isLoading, error } = useMovies(query);

  // let countTest = 0;

  // const isTop = movieRating > 8;
  // const [avgRating, setAvgRating] = useState(0);
  // console.log(isTop);
  // const [selectedWatched, setSelectedWatched] = useState(null);

  // (async () => {
  //   const moviesData = await getMovies();
  //   setMovies(moviesData);
  // })();
  // useEffect(() => console.log("C"));
  // useEffect(() => console.log("B"), []);
  // console.log("A");

  // useEffect(() => {
  //   function globalKeyPress(e) {
  //     if (e.key === "Escape") {
  //       setSelectedId(null);
  //       console.log("CLOSING");
  //     }
  //   }
  //   document.addEventListener("keydown", globalKeyPress);

  //   return () => document.removeEventListener("keydown", globalKeyPress);
  // }, []);

  async function handleRemoveItem(id) {
    await deleteWatched(id);
    const statsData = await getWatchedStats();
    setWatched((watched) => watched.filter((wc) => wc._id !== id));
    // localStorage.setItem(
    //   "watched",
    //   JSON.stringify(watched.filter((wc) => wc._id !== id))
    // );
    setStats(statsData[0]);
  }

  async function handleAddToList(data) {
    const newWatched = await createWatched(data);
    const statsData = await getWatchedStats();

    // localStorage.setItem("watched", JSON.stringify([...watched, newWatched]));
    setWatched((watched) => [
      ...watched,
      { ...newWatched, count: count.current },
    ]);
    setStats(statsData[0]);
    // setAvgRating(movieRating);
    // setAvgRating((avg) => (avg + movieRating) / 2);
    // alert(avgRating);
    setSelectedId(null);
  }

  async function handleItemClick(id) {
    if (!id) return;
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    // if (id === selectedMovie?._id) return setSelectedMovie(null);
    // else setSelectedMovie(true);
    // const movie = await getMovieDetail(id);
    // const watchedCheck = await getWatchedDetail(id);
    // console.log(watchedCheck);
    // setMovieRating(watchedCheck ? watchedCheck.userRating : 0);

    // setSelectedMovie(movie);
    // const movie = await getMovieDetail(id);
    // setSelectedMovie((selectedMovie) => {
    //   return movie;
    // });
  }
  async function handleQuery(q) {
    setQuery(q);
    setSelectedId(null);
  }

  function handleCloseDetail() {
    // document.title = "usePopcorn";
    setSelectedId(null);
  }

  useEffect(() => {
    if (!movieRating) {
      count.current = 0;
      return;
    }
    // countTest++;
    count.current++;
    // console.log(countTest);
    // console.log(count.current);
  }, [movieRating]);

  useEffect(() => {
    // if (!watched.length) return;
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    // console.log("ok");
    async function loadData() {
      // const moviesData = await getMovies();
      // const watchedData = await getWatched();

      // const watchedData = localStorage.getItem("watched")
      //   ? JSON.parse(localStorage.getItem("watched"))
      //   : [];
      const statsData = await getWatchedStats();
      // console.log(selectedId);
      // if (selectedId) {
      //   const selectedMovie = await getMovieDetail(selectedId);
      //   // console.log(statsData);
      //   // setMovies(moviesData);
      //   setSelectedMovie(selectedMovie);
      // }
      // setWatched(watchedData);
      setStats(statsData[0]);
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   setError("");
  //   setIsLoading(true);
  //   if (!query || query.length < 3) {
  //     setIsLoading(false);
  //     return setMovies([]);
  //   }
  //   async function searchMovies() {
  //     try {
  //       const movies = await getMovies(query, controller);
  //       if (movies?.length === 0) throw new Error("No movies data found!");

  //       setMovies(movies);
  //     } catch (err) {
  //       // console.log(err.message);
  //       // setIsLoading(false);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   searchMovies();
  //   return () => controller.abort();
  // }, [query]);

  return (
    <div className="container">
      <Header query={query}>
        <SearchBox query={query} onSetQuery={handleQuery} />
        <Result movies={movies} />
      </Header>
      {/* <p>{avgRating}</p> */}
      <Main>
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
          {selectedId ? (
            <Detail
              // key={selectedId}
              selectedId={selectedId}
              onCloseDetail={handleCloseDetail}
              onSetRating={setMovieRating}
              rating={movieRating}
              onAddToList={handleAddToList}
              setMovieRating={setMovieRating}
              watched={watched}
              setSelectedId={setSelectedId}
            />
          ) : (
            <List stats={stats} type="watched">
              {watched?.map((wc) => (
                <Item item={wc} key={wc._id} onRemoveItem={handleRemoveItem} />
              ))}
            </List>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
