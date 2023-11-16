// import { useState, useEffect } from "react";
// import { getMovies } from "../api/movie";
// import { getWatched, getWatchedStats } from "../api/watched";
// import ListBox from "./ListBox";
// import WatchedBox from "./WatchedBox";
// import Box from "./Box";
// import List from "./List";

export default function Main({ children }) {
  return (
    <main className="main">
      <div className="grid grid--2-cols grid--cg-sm">{children}</div>
    </main>
  );
}
