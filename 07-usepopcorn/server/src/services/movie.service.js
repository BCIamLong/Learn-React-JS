import { Movie } from "../models/index.js";
import { APIFeatures } from "../utils/index.js";

const getMovies = async (queryStr) => {
  try {
    const count = await Movie.countDocuments();
    const apiFeatures = new APIFeatures(Movie.find(), queryStr)
      .filter()
      .sort()
      .select()
      .pagination(count);

    const movies = await apiFeatures.query;
    return movies;
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchMovies = async (title) => {
  try {
    const movies = await Movie.aggregate([
      {
        $search: {
          moreLikeThis: {
            like: { title: title },
          },
        },
      },
      {
        $limit: 6,
      },
    ]);
    return movies;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getMovies, searchMovies };
