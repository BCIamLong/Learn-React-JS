import { watchedService } from "../services/index.js";
const { getWatched, getStats } = watchedService;

const getWatchedList = async (req, res) => {
  try {
    const watched = await getWatched();

    res.json({
      status: "success",
      data: {
        watched,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getWatchedStats = async (req, res) => {
  try {
    const stats = await getStats();

    res.json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export default { getWatchedList, getWatchedStats };
