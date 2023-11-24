import { Watched } from "../models/index.js";

const getWatched = async () => {
  try {
    const watched = await Watched.find();
    return watched;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAWatched = async (id) => {
  try {
    const watched = await Watched.findOne({ movie: id });
    return watched;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createWatched = async (data) => {
  try {
    const newWatched = await Watched.create(data);
    return newWatched;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeWatched = async (id) => {
  try {
    await Watched.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStats = async () => {
  try {
    const stats = await Watched.aggregate([
      {
        $group: {
          _id: null,
          avgUserRating: { $avg: "$userRating" },
          avgImdbRating: { $avg: "$imdbRating" },
          avgRuntime: { $avg: "$runtime" },
          count: { $sum: 1 },
        },
      },
    ]);
    return stats;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  getWatched,
  getStats,
  createWatched,
  removeWatched,
  getAWatched,
};
