import { Watched } from "../models/index.js";

const getWatched = async () => {
  try {
    const watched = await Watched.find();
    return watched;
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
export default { getWatched, getStats };
