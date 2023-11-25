export const getMovies = async (query, controller) => {
  try {
    const res = await fetch(
      `http://localhost:3100/api/v1/movies?title=${query}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    return data.data.movies;
  } catch (error) {
    if (error.name === "AbortError") return;
    throw new Error("Something went wrong with fetching movies data!");
  }
};

export const getMovieDetail = async (id) => {
  try {
    const res = await fetch(`http://localhost:3100/api/v1/movies/${id}`);
    const data = await res.json();
    return data.data.movie;
  } catch (error) {
    throw new Error("Something went wrong with fetching movie data!");
  }
};
