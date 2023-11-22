import { movieService } from "../services/index.js";

const { getMovies } = movieService;

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

export default { getMoviesList };
