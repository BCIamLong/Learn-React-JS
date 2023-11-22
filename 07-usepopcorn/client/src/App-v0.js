import { useEffect, useState } from "react";
import "./App.css";
import { getMovies } from "./api/movie";
import { getWatched, getWatchedStats } from "./api/watched";

function App() {
  const [isMoviesOpen, setIsMoviesOpen] = useState(true);
  const [isWatchedOpen, setIsWatchedOpen] = useState(true);
  const [movies, setMovies] = useState();
  const [watched, setWatched] = useState();
  const [query, setQuery] = useState("");
  const [stats, setStats] = useState();

  useEffect(
    () => async () => {
      const moviesData = await getMovies();
      const watchedData = await getWatched();
      const statsData = await getWatchedStats();
      console.log(statsData);
      setMovies(moviesData);
      setWatched(watchedData);
      setStats(statsData[0]);
    },
    []
  );
  return (
    <div className="container">
      <header className="header">
        <p className="heading">
          <span>🍿</span> usePopcorn
        </p>
        <input
          className="search-box"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p>Found 3 result</p>
      </header>
      <main className="main">
        <div className="grid grid--2-cols grid--cg-sm">
          <div className="movies">
            <button
              className="btn"
              onClick={() => setIsMoviesOpen(!isMoviesOpen)}
            >
              {isMoviesOpen ? <span>&#8211;</span> : "+"}
            </button>

            {isMoviesOpen && (
              <ul className="list">
                {movies?.map((mv) => (
                  <li className="item" key={mv._id}>
                    <img className="image" src={mv.poster} alt={mv.title} />
                    <div className="item-info">
                      <p className="name">{mv.title}</p>
                      <p className="year">📅 {mv.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="watched-movies">
            <button
              className="btn"
              onClick={() => setIsWatchedOpen(!isWatchedOpen)}
            >
              {isWatchedOpen ? <span>&#8211;</span> : "+"}
            </button>
            {isWatchedOpen && (
              <ul className="list">
                <li className="item stats">
                  <div className="item-info">
                    <p className="name">Movies you watched</p>
                    <div className="review">
                      <p>{stats?.count} movies</p>
                      <p>⭐ {stats?.avgImdbRating}</p>
                      <p>🌟 {stats?.avgUserRating}</p>
                      <p>⏳ {stats?.avgRuntime} min</p>
                    </div>
                  </div>
                </li>
                {watched?.map((wc) => (
                  <li className="item" key={wc._id}>
                    <img className="image" src={wc.poster} alt={wc.title} />
                    <div className="item-info">
                      <p className="name">{wc.title}</p>
                      <div className="review">
                        <p>⭐ {wc.imdbRating}</p>
                        <p>🌟 {wc.userRating}</p>
                        <p>⏳ {wc.runtime} min</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
