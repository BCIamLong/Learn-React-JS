export const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/movies");
    const data = await res.json();
    return data.data.movies;
  } catch (error) {
    console.log(error);
  }
};
