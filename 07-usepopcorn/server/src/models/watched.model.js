import mongoose from "mongoose";

const watchedSchema = new mongoose.Schema({
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
  imdbRating: {
    type: Number,
    default: 8,
  },
  userRating: {
    type: Number,
    default: 4.5,
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: true,
  },
});

const Watched = mongoose.model("Watched", watchedSchema);

export default Watched;
