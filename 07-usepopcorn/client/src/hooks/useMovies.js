import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setError("");
    setIsLoading(true);
    if (!query || query.length < 3) {
      setIsLoading(false);
      return setMovies([]);
    }
    async function searchMovies() {
      try {
        const movies = await getMovies(query, controller);
        if (movies?.length === 0) throw new Error("No movies data found!");

        setMovies(movies);
      } catch (err) {
        // console.log(err.message);
        // setIsLoading(false);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    searchMovies();
    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
