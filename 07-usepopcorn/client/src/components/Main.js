import { useState, useEffect } from "react";
import { getMovies } from "../api/movie";
import { getWatched, getWatchedStats } from "../api/watched";
// import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

export default function Main({ onSetMovies, children }) {
  const [watched, setWatched] = useState();
  const [stats, setStats] = useState();

  useEffect(
    () => async () => {
      const moviesData = await getMovies();
      const watchedData = await getWatched();
      const statsData = await getWatchedStats();
      // console.log(statsData);
      onSetMovies(moviesData);
      setWatched(watchedData);
      setStats(statsData[0]);
    },
    [onSetMovies]
  );

  return (
    <main className="main">
      <div className="grid grid--2-cols grid--cg-sm">
        {children}
        <WatchedBox stats={stats} data={watched} />
      </div>
    </main>
  );
}
