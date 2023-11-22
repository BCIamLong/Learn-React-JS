export const getMovies = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3100/api/v1/movies?title=${query}`
    );
    const data = await res.json();
    return data.data.movies;
  } catch (error) {
    throw new Error("Something went wrong with fetching movies data!");
  }
};
