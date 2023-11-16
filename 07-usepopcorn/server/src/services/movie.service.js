import { Movie } from "../models/index.js";

const getMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getMovies };
