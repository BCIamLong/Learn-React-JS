import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  imdbRating: {
    type: Number,
    default: 8,
  },
  description: {
    type: String,
    required: true,
  },
  starring: {
    type: Array,
    required: true,
  },
  directed: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
