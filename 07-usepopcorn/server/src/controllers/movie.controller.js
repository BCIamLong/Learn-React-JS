import { movieService } from "../services/index.js";

const { getMovies, getMovie } = movieService;

const getMoviesList = async (req, res) => {
  try {
    const movies = await getMovies(req.query);

    res.json({
      status: "success",
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getMovieDetail = async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);

    res.json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export default { getMoviesList, getMovieDetail };
